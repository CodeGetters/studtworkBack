import { join } from "path";
import {
  I18nModule,
  QueryResolver,
  AcceptLanguageResolver,
  HeaderResolver,
} from "nestjs-i18n";
import { Module } from "@nestjs/common";
import { BackModule } from "./back.module";
import { FrontModule } from "./front.module";
import { AppService } from "@/services/app.service";
import { PrismaService } from "@/db/mysql.service";
import { AppController } from "@/controllers/app.controller";

@Module({
  imports: [
    FrontModule,
    BackModule,
    I18nModule.forRoot({
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
