import { Module } from "@nestjs/common";
import { FrontService } from "@/services/front.service";
import { FrontController } from "@/controllers/front.controller";

@Module({
  imports: [],
  controllers: [FrontController],
  providers: [FrontService],
})
export class FrontModule {}
