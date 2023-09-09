import { extname, join } from "path";
import {
  I18nModule,
  QueryResolver,
  AcceptLanguageResolver,
  HeaderResolver,
} from "nestjs-i18n";
import { Request } from "express";
import { diskStorage } from "multer";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { BackModule } from "./back.module";
import { FrontModule } from "./front.module";
import { PrismaService } from "@/db/mysql.service";
import { AppService } from "@/services/app.service";
import { MulterModule } from "@nestjs/platform-express";
import { AppController } from "@/controllers/app.controller";

@Module({
  imports: [
    FrontModule,
    BackModule,

    JwtModule.register({
      global: true,
    }),

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

    I18nModule.forRoot({
      logging: true,
      fallbackLanguage: "en",
      loaderOptions: {
        path: join(__dirname, "/i18n/"),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ["lang"] },
        AcceptLanguageResolver,
        new HeaderResolver(["x-lang"]),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
