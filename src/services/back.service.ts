import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "@/db/mysql.service";
import { I18nLang, I18nService } from "nestjs-i18n";
import { Injectable } from "@nestjs/common";
import { blue } from "kolorist";

import { jwtConstants } from "@/common/utils/auth.constant";

@Injectable()
export class BackService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}
  getHello(@I18nLang() lang: string) {
    console.log(blue("[TEST]: 请求成功！"));

    return { info: this.i18n.translate("test.Hello", { lang }) };
  }

  userCreate() {
    return { describe: "用户注册接口" };
  }

  userLogin() {
    return { describe: "用户登录接口" };
  }

  userInfo() {
    return { describe: "更新用户信息接口" };
  }

  userAvatar(file: Express.Multer.File) {
    console.log(file);
    return { describe: "更新用户头像接口" };
  }

  articleCreate() {
    return { describe: "用户创建文章接口" };
  }

  articleInfo() {
    return { describe: "用户创建文章接口" };
  }

  articleFind() {
    return { describe: "用户查询某一文章接口" };
  }

  articleAddTag() {
    return { describe: "用户对某一文章添加标签" };
  }

  articleAddClassify() {
    return { describe: "用户对某一文章添加分类" };
  }

  articlesFind() {
    return { describe: "用户查询全部文章接口" };
  }

  articleTagFind() {
    return { describe: "根据某个 tag 返回所有属于 tag 的文章" };
  }

  articleClassifyFind() {
    return { describe: "根据某个分类名返回所有属于该分类的文章" };
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
}
