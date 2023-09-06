import "module-alias/register";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/modules/app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import type { OpenAPIObject } from "@nestjs/swagger";
import { blue } from "kolorist";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("v1");

  const config = new DocumentBuilder()
    .setTitle("studTWork")
    .setDescription("studTWork 博客的前后台接口文档")
    .setVersion("1.0.0")
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, document);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3000);
  console.log(blue("[API] http://localhost:3000/v1"));
}
bootstrap();
