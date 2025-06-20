import { IsIn, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCourseApplicationDTO {
  @IsInt()
  candidateId: number;

  @IsInt()
  courseId: number;

  @IsString()
  @IsNotEmpty()
  previousRoles: string;

  @IsString()
  @IsIn(["Tutor", "Lab Assistant"])
  appliedRole: string;

  @IsString()
  @IsIn(["Full-Time", "Part-Time"])
  availability: string;

  @IsString()
  @IsNotEmpty()
  skills: string;

  @IsString()
  @IsNotEmpty()
  credentials: string;
}
