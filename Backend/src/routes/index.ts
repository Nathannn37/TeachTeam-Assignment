import { Router } from "express";
import candidateRoutes from "./candidate.routes";
import lecturerRoutes from "./lecturer.routes";
import courseRoutes from "./course.routes";

const router = Router();

router.use("/", courseRoutes);
router.use("/", candidateRoutes);
router.use("/", lecturerRoutes);

export default router;
