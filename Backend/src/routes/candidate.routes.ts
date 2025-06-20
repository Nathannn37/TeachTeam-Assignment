import { Router } from "express";
import { applyForCourse } from "../controller/ApplyController";
import { getCandidateApplications } from "../controller/CandidateController";
import { validateDto } from "../middleware/validate";
import { CreateCourseApplicationDTO } from "../dtos/create-courseApplication.dto";

const router = Router();

router.post("/apply", validateDto(CreateCourseApplicationDTO), applyForCourse);
router.get("/candidate/applications", getCandidateApplications);

export default router;
