import "module-alias/register";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/modules/app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import type { OpenAPIObject } from "@nestjs/swagger";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("studTWork")
    .setDescription("")
    .setVersion("1.0.0")
    .addTag("example")
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, document);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3000);
}
bootstrap();
