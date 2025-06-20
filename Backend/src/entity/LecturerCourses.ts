import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Course } from "./Course";
import { Lecturer } from "./Lecturer";

@Entity()
export class LecturerCourse {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.courses)
  lecturer: Lecturer;

  @ManyToOne(() => Course, (course) => course.lecturerLinks)
  course: Course;
}
