import { Module } from "@nestjs/common";
import { AppController } from "@/controllers/app.controller";
import { AppService } from "@/services/app.service";
import { BackModule } from "./back.module";
import { FrontModule } from "./front.module";
import { PrismaService } from "@/db/mysql.service";

@Module({
  imports: [FrontModule, BackModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
