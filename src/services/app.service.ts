import { blue } from "kolorist";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "@/db/mysql.service";
import { I18nLang, I18nService } from "nestjs-i18n";
import { jwtConstants } from "@/common/utils/auth.constant";

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}

  getHello(@I18nLang() lang: string) {
    console.log(blue("[TEST]: app 示例请求成功！"));

    return { info: this.i18n.translate("test.Hello", { lang }) };
  }

  /**
   * 用户创建
   * @param data
   */
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const res: Prisma.Prisma__UserClient<{
      id: number;
      name: string;
      pwd: string;
    }> = this.prisma.user.create({ data });

    console.log(blue("[CREATEUser]创建测试用户成功"));

    return res;
  }

  /**
   * 查找目标用户
   * @param userId
   */
  async findUser(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  /**
   * 登录
   * @param data
   */
  async signIn(data): Promise<{
    result: string;
    userInfo;
    access_token: string;
    refresh_token: string;
  }> {
    const result: string = "";
    const { id } = data;
    const userInfo = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });

    const payload = { sub: id, username: userInfo.name };
    // if (userInfo.pwd === pwd) {
    //   result = "登录成功";
    // }
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: "60s",
      secret: jwtConstants.access_secret,
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: "7d",
      secret: jwtConstants.refresh_secret,
    });

    return { result, userInfo, access_token, refresh_token };
  }

  /**
   * 文件上传
   * @param file
   */
  async uploadFile(file) {
    return { file };
  }
}
