import { Router } from "express";
import {
  saveLecturerReview,
  getLecturerReviews,
} from "../controller/LecturerReviewController";
import { getLecturerApplicants } from "../controller/LecturerController";
import { getGlobalReviewStats } from "../controller/LecturerStatsController";
import { validateDto } from "../middleware/validate";
import { ValidateLecReviewDTO } from "../dtos/validate-lecturerReview.dto";

const router = Router();

router.get("/lecturer/applicants", getLecturerApplicants);
// router.post(
//   "/lecturer/review",
//   validateDto(ValidateLecReviewDTO),
//   saveLecturerReview
// );
router.post("/lecturer/review", saveLecturerReview);
router.get("/lecturer/reviewed", getLecturerReviews);
router.get("/lecturer/review-stats", getGlobalReviewStats);

export default router;
