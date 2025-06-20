"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const CandidateProfile_1 = require("./entity/CandidateProfile");
const Course_1 = require("./entity/Course");
const CourseApplication_1 = require("./entity/CourseApplication");
const Lecturer_1 = require("./entity/Lecturer");
const LecturerCourses_1 = require("./entity/LecturerCourses");
const User_1 = require("./entity/User");
exports.AppDataSource = new typeorm_1.DataSource({
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
        User_1.User,
        CandidateProfile_1.CandidateProfile,
        Course_1.Course,
        Lecturer_1.Lecturer,
        CourseApplication_1.CourseApplication,
        LecturerCourses_1.LecturerCourse,
    ],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map