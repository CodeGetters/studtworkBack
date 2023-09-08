import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { blue, yellow, red } from "kolorist";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
      .then(() => {
        console.log(blue("[MYSQL]连接成功..."));
      })
      .catch((err) => {
        console.log(yellow("[MYSQL]连接失败..."), red(err));
      });
  }
}
