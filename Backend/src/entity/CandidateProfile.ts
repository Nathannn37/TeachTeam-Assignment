import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { CourseApplication } from "./CourseApplication";
import { User } from "./User";

@Entity()
export class CandidateProfile {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 35 })
  firstName: string;

  @Column({ type: "varchar", length: 35 })
  lastName: string;

  @OneToOne(() => User, (user) => user.candidateProfile)
  @JoinColumn()
  user: User;

  @OneToMany(() => CourseApplication, (app) => app.candidate)
  applications: CourseApplication[];
}
