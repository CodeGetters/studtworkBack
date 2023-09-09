import { I18nLang } from "nestjs-i18n";
import {
  Get,
  Post,
  Body,
  Controller,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { BackService } from "@/services/back.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("后台接口")
@Controller("back")
export class BackController {
  constructor(private readonly backService: BackService) {}

  @Get()
  @ApiOperation({
    summary: "示例请求",
    description: "测试请求",
  })
  getHello(@I18nLang() lang: string) {
    return this.backService.getHello(lang);
  }

  @Post("create")
  @ApiOperation({
    summary: "创建用户",
    description: "用户注册接口",
  })
  userCreate() {
    return this.backService.userCreate();
  }

  @Post("login")
  @ApiOperation({
    summary: "用户登录",
    description: "用户登录接口",
  })
  userLogin() {
    return this.backService.userLogin();
  }

  @Post("updateInfo")
  @ApiOperation({
    summary: "用户信息",
    description: "更新用户信息",
  })
  userInfo() {
    return this.backService.userInfo();
  }

  @Post("userAvatar")
  @ApiOperation({
    summary: "用户头像",
    description: "更换用户头像",
  })
  @UseInterceptors(FileInterceptor("file"))
  userAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.backService.userAvatar(file);
  }

  @Post("createArticle")
  @ApiOperation({
    summary: "创建文章",
    description: "用户创建文章接口",
  })
  articleCreate() {
    return this.backService.articleCreate();
  }

  @Post("articleInfo")
  @ApiOperation({
    summary: "文章信息",
    description: "用户修改文章信息",
  })
  articleInfo() {
    return this.backService.articleInfo();
  }

  @Get("find")
  @ApiOperation({
    summary: "文章查询",
    description: "用户查询某一文章接口",
  })
  articleFind() {
    return this.backService.articleFind();
  }

  @Get("addTag")
  @ApiOperation({
    summary: "文章添加标签",
    description: "用户对某一文章添加标签",
  })
  articleAddTag() {
    return this.backService.articleAddTag();
  }

  @Get("addClassify")
  @ApiOperation({
    summary: "文章添加分类",
    description: "用户对某一文章添加分类",
  })
  articleAddClassify() {
    return this.backService.articleAddClassify();
  }

  @Get("finds")
  @ApiOperation({
    summary: "文章查询",
    description: "用户查询全部文章接口",
  })
  articlesFind() {
    return this.backService.articlesFind();
  }

  @Get("tagFind")
  @ApiOperation({
    summary: "查询文章",
    description: "根据某个 tag 返回所有属于 tag 的文章",
  })
  articleTagFind() {
    return this.backService.articleTagFind();
  }

  @Get("classifyFind")
  @ApiOperation({
    summary: "查询文章",
    description: "根据某个分类名返回所有属于该分类的文章",
  })
  articleClassifyFind() {
    return this.backService.articleClassifyFind();
  }

  @Post("signIn")
  @ApiOperation({ summary: "示例 post 请求", description: "app 用户登录请求" })
  @UseInterceptors(FileInterceptor("file"))
  signIn(@Body() data) {
    return this.backService.signIn(data);
  }
}
