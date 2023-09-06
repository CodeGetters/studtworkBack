import { Module } from "@nestjs/common";
import { BackController } from "@/controllers/back.controller";
import { BackService } from "@/services/back.service";

@Module({
  imports: [],
  controllers: [BackController],
  providers: [BackService],
})
export class BackModule {}
