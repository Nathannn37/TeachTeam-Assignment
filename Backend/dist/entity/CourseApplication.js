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
exports.CourseApplication = void 0;
const typeorm_1 = require("typeorm");
const CandidateProfile_1 = require("./CandidateProfile");
const Course_1 = require("./Course");
let CourseApplication = class CourseApplication {
};
exports.CourseApplication = CourseApplication;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CourseApplication.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CandidateProfile_1.CandidateProfile, (candidate) => candidate.applications),
    __metadata("design:type", CandidateProfile_1.CandidateProfile)
], CourseApplication.prototype, "candidate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Course_1.Course, (course) => course.applications),
    __metadata("design:type", Course_1.Course)
], CourseApplication.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseApplication.prototype, "appliedRole", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseApplication.prototype, "availability", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseApplication.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseApplication.prototype, "credentials", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CourseApplication.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CourseApplication.prototype, "updatedAt", void 0);
exports.CourseApplication = CourseApplication = __decorate([
    (0, typeorm_1.Entity)()
], CourseApplication);
//# sourceMappingURL=CourseApplication.js.map