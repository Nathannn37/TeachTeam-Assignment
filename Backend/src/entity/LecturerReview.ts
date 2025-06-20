import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CourseApplication } from "./CourseApplication";
import { Lecturer } from "./Lecturer";

@Entity()
export class LecturerReview {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @ManyToOne(() => CourseApplication, { eager: true })
  application: CourseApplication;

  @ManyToOne(() => Lecturer, { eager: true })
  lecturer: Lecturer;

  @Column({ nullable: true })
  rank: number;

  @Column({ nullable: true })
  comment: string;

  @Column({ default: false })
  selected: boolean;
}
