import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsIn(["Tutor", "Candidate"])
  role: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
