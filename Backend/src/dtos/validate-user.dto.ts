import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ValidateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
