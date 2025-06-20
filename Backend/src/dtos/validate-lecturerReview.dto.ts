import { IsBoolean, IsInt, IsPositive, IsString } from "class-validator";

export class ValidateLecReviewDTO {
  @IsPositive()
  rank: number;

  @IsString()
  comment: string;
}
