import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { LecturerCourse } from "./LecturerCourses";
import { User } from "./User";

@Entity()
export class Lecturer {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 35 })
  firstName: string;

  @Column({ type: "varchar", length: 35 })
  lastName: string;

  @OneToOne(() => User, (user) => user.lecturerProfile)
  @JoinColumn()
  user: User;

  @OneToMany(() => LecturerCourse, (lc) => lc.lecturer)
  courses: LecturerCourse[];
}
