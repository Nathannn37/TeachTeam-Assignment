import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CourseApplication } from "./CourseApplication";
import { LecturerCourse } from "./LecturerCourses";

@Entity()
export class Course {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 8 })
  courseCode: string;

  @Column({ type: "varchar", length: 40 })
  courseName: string;

  @Column({ type: "varchar" })
  availability: string;

  @OneToMany(() => CourseApplication, (app) => app.course)
  applications: CourseApplication[];

  @OneToMany(() => LecturerCourse, (lc) => lc.course)
  lecturerLinks: LecturerCourse[];
}
