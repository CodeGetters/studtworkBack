import "module-alias/register";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/modules/app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import type { OpenAPIObject } from "@nestjs/swagger";
import { blue } from "kolorist";
import { HttpExceptionFilter } from "@/common/filters/http-exception.filter";
import { ValidationPipe } from "@nestjs/common";
import { LoggerMiddleware } from "@/common/middleware/logger.middleware";
import { TransformInterceptor } from "@/common/interceptors/transform";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("v1");
  app.use(LoggerMiddleware);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

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
  console.log(blue("[API Docs] http://localhost:3000/docs"));
  console.log(blue("[Test API] http://localhost:3000/v1/example"));
}
bootstrap();
