import { Controller, Get } from "@nestjs/common";
import { AppService } from "@/services/app.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("测试")
@Controller("/")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: "示例请求",
    description: "测试请求",
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
