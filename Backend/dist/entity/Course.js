"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const typeorm_1 = require("typeorm");
const CourseApplication_1 = require("./CourseApplication");
const LecturerCourses_1 = require("./LecturerCourses");
let Course = class Course {
};
exports.Course = Course;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Course.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "courseCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "courseName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "availability", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CourseApplication_1.CourseApplication, (app) => app.course),
    __metadata("design:type", Array)
], Course.prototype, "applications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => LecturerCourses_1.LecturerCourse, (lc) => lc.course),
    __metadata("design:type", Array)
], Course.prototype, "lecturerLinks", void 0);
exports.Course = Course = __decorate([
    (0, typeorm_1.Entity)()
], Course);
//# sourceMappingURL=Course.js.map