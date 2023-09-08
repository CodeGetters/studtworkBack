import { blue } from "kolorist";
import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "@/db/mysql.service";
import { I18nLang, I18nService } from "nestjs-i18n";

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {}

  getHello(@I18nLang() lang: string) {
    console.log(blue("[TEST]: app 示例请求成功！"));

    return { info: this.i18n.translate("test.Hello", { lang }) };
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const res: Prisma.Prisma__UserClient<{
      id: number;
      name: string;
      pwd: string;
    }> = this.prisma.user.create({ data });

    console.log(blue("[CREATEUser]创建测试用户成功"));

    return res;
  }

  async findUser(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
