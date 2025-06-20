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
exports.CandidateProfile = void 0;
const typeorm_1 = require("typeorm");
const CourseApplication_1 = require("./CourseApplication");
const User_1 = require("./User");
let CandidateProfile = class CandidateProfile {
};
exports.CandidateProfile = CandidateProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CandidateProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CandidateProfile.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CandidateProfile.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CandidateProfile.prototype, "avatarUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CandidateProfile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CandidateProfile.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.candidateProfile),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], CandidateProfile.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CourseApplication_1.CourseApplication, (app) => app.candidate),
    __metadata("design:type", Array)
], CandidateProfile.prototype, "applications", void 0);
exports.CandidateProfile = CandidateProfile = __decorate([
    (0, typeorm_1.Entity)()
], CandidateProfile);
//# sourceMappingURL=CandidateProfile.js.map