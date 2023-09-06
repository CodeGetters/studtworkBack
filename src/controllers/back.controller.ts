import { Controller, Get } from "@nestjs/common";
import { BackService } from "@/services/back.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("后台接口")
@Controller("back")
export class BackController {
  constructor(private readonly appService: BackService) {}

  @Get()
  @ApiOperation({
    summary: "示例请求",
    description: "测试请求",
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
