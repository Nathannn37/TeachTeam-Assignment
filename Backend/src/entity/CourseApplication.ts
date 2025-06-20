import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { CandidateProfile } from "./CandidateProfile";
import { Course } from "./Course";

@Entity()
export class CourseApplication {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @ManyToOne(() => CandidateProfile, (candidate) => candidate.applications)
  candidate: CandidateProfile;

  @ManyToOne(() => Course, (course) => course.applications)
  course: Course;

  @Column({ type: "varchar" })
  previousRoles: string;

  @Column({ type: "varchar" })
  appliedRole: "Tutor" | "Lab Assistant";

  @Column({ type: "varchar" })
  availability: "Full-Time" | "Part-Time";

  @Column({ type: "varchar" })
  skills: string;

  @Column({ type: "varchar" })
  credentials: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
