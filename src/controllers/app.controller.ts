import { AppService } from "@/services/app.service";
import { Get, Post, Body, Controller, UseInterceptors } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { createUserDto } from "@/common/dto/app.dto";

@ApiTags("测试")
@Controller("example")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: "示例 get 请求",
    description: "app 连接测试请求",
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("create")
  @ApiOperation({
    summary: "示例 post 请求",
    description: "app 创建用户测试请求",
  })
  @UseInterceptors(FileInterceptor("file"))
  createUsr(@Body() userData: createUserDto) {
    return this.appService.createUser(userData);
  }
}
