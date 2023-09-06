import { Controller, Get } from "@nestjs/common";
import { FrontService } from "@/services/front.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("前台接口")
@Controller("front")
export class FrontController {
  constructor(private readonly appService: FrontService) {}

  @Get()
  @ApiOperation({
    summary: "示例请求",
    description: "测试请求",
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
