import { Injectable } from "@nestjs/common";
import { blue } from "kolorist";

@Injectable()
export class FrontService {
  getHello(): string {
    console.log(blue("[TEST]: 请求成功！"));

    return "示例请求成功!";
  }
}
