import {
  Get,
  Post,
  Body,
  Query,
  Controller,
  UseInterceptors,
} from "@nestjs/common";
import { I18nLang } from "nestjs-i18n";
import { AppService } from "@/services/app.service";
import { createUserDto } from "@/common/dto/app.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("测试")
@Controller("example")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: "示例 get 请求",
    description: "app 连接测试请求",
  })
  getHello(@I18nLang() lang: string) {
    return this.appService.getHello(lang);
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

  @Get("find")
  @ApiOperation({
    summary: "示例 get 请求",
    description: "app 返回用户列表测试请求",
  })
  findUser(@Query() data) {
    return this.appService.findUser(Number(data.userId));
  }
}
