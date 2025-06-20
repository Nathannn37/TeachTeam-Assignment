import "reflect-metadata";
import { DataSource } from "typeorm";
import { CandidateProfile } from "./entity/CandidateProfile";
import { Course } from "./entity/Course";
import { CourseApplication } from "./entity/CourseApplication";
import { Lecturer } from "./entity/Lecturer";
import { LecturerCourse } from "./entity/LecturerCourses";
import { User } from "./entity/User";
import { LecturerReview } from "./entity/LecturerReview";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "209.38.26.237",
  port: 3306,
  username: "S4090456",
  password: "Password123",
  database: "S4090456",
  // synchronize: true will automatically create database tables based on entity definitions
  // and update them when entity definitions change. This is useful during development
  // but should be disabled in production to prevent accidental data loss.
  synchronize: true,
  logging: true,
  entities: [
    User,
    CandidateProfile,
    Course,
    Lecturer,
    CourseApplication,
    LecturerCourse,
    LecturerReview,
  ],
  migrations: [],
  subscribers: [],
});
