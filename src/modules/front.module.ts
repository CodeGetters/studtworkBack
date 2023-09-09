import { Module } from "@nestjs/common";
import { FrontService } from "@/services/front.service";
import { FrontController } from "@/controllers/front.controller";
import { PrismaService } from "@/db/mysql.service";

@Module({
  imports: [],
  controllers: [FrontController],
  providers: [FrontService, PrismaService],
})
export class FrontModule {}
