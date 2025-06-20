import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
} from "typeorm";
import { CandidateProfile } from "./CandidateProfile";
import { Lecturer } from "./Lecturer";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 35 })
  firstName: string;

  @Column({ type: "varchar", length: 35 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "varchar" })
  role: "Candidate" | "Lecturer" | "Admin";

  @Column({ type: "varchar" })
  password: string;

  @CreateDateColumn()
  dateJoined: Date;

  @OneToOne(() => CandidateProfile, (profile) => profile.user)
  candidateProfile: CandidateProfile;

  @OneToOne(() => Lecturer, (profile) => profile.user)
  lecturerProfile: Lecturer;
}
