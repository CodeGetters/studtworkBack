import { Request } from "express";
import { extname, join } from "path";
import { diskStorage } from "multer";
import { Module } from "@nestjs/common";
import { PrismaService } from "@/db/mysql.service";
import { BackService } from "@/services/back.service";
import { MulterModule } from "@nestjs/platform-express";
import { BackController } from "@/controllers/back.controller";

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 指定上传文件得存储位置
        destination: join(__dirname, "/uploadFile"),
        // 时间戳重命名上传文件
        filename: (req: Request, file: Express.Multer.File, callback) => {
          const fileName: string = `${
            new Date().getTime() + extname(file.originalname)
          }`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [BackController],
  providers: [BackService, PrismaService],
})
export class BackModule {}
