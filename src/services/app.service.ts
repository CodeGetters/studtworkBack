import { Prisma, User } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/db/mysql.service";
import { blue } from "kolorist";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    console.log(blue("[TEST]: app 请求成功！"));

    return "app 示例请求成功!";
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
}
