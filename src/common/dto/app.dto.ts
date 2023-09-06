import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class createUserDto {
  @Length(5, 10, {
    message: "用户名在 5 个到 10 个之间",
  })
  @ApiProperty({ description: "姓名" })
  readonly name: string;

  @ApiProperty({ description: "密码" })
  @IsNotEmpty({ message: "用户密码必填" })
  readonly pwd: string;
}
