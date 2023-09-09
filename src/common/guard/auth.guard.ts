import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { blue, yellow } from "kolorist";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "@/common/utils/auth.constant";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  // TODO:这里就只能在前端通过调用接口，根据返回的信息是否是因为 token 过期
  // 然后再次调用刷新 token 的接口(这里就要判断 refresh_token 是否过期)
  // 如果过期了就需要清除前端本地的过期 token，退出登录
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { access_token, refresh_token } =
      this.extractTokenFromHeader(request);

    if (!(access_token && refresh_token)) {
      throw new UnauthorizedException("无 token，请先登录或注册");
    }

    try {
      const access_payload = await this.jwtService.verifyAsync(access_token, {
        secret: jwtConstants.access_secret,
      });

      request["user"] = access_payload;

      console.log(blue("token 验证成功"));
    } catch {
      console.log(yellow("token 过期"));
      throw new UnauthorizedException(
        "token 已过期，请使用 refresh_token 进行刷新",
      );
    }

    try {
      const refresh_payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: jwtConstants.refresh_secret,
      });

      request["user"] = refresh_payload;

      console.log(blue("刷新 token 验证成功"));
    } catch {
      console.log(
        yellow("刷新 token 过期，退出登录并清除本地登录信息及过期 token..."),
      );
      throw new UnauthorizedException("刷新 token 过期");
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): {
    access_token: string | undefined;
    refresh_token: string | undefined;
  } {
    const [type, access_token] =
      request.headers.authorization?.split(" ") ?? [];
    const refresh_token = String(request.headers["x-refresh-token"]);

    return {
      access_token: type === "Bearer" ? access_token : undefined,
      refresh_token,
    };
  }
}
