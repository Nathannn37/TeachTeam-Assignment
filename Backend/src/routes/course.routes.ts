import { Router } from "express";
import { getCourses } from "../controller/CourseController";

const router = Router();

router.get("/courses", getCourses);

export default router;
