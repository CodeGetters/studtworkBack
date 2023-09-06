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
}
