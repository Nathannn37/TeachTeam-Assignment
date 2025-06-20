import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { CourseApplication } from "../entity/CourseApplication";
import { CandidateProfile } from "../entity/CandidateProfile";

export const applyForCourse = async (req: Request, res: Response) => {
  const {
    candidateId,
    courseId,
    previousRoles,
    appliedRole,
    availability,
    skills,
    credentials,
  } = req.body;
  // Finds candidiate profile by user ID
  const candidateProfile = await AppDataSource.getRepository(
    CandidateProfile
  ).findOne({
    where: { user: { id: parseInt(candidateId) } },
    relations: ["user"],
  });
  if (!candidateProfile) {
    return res.status(400).json({ error: "Candidate profile not found" });
  }

  const existingApplication = await AppDataSource.getRepository(
    CourseApplication
  ).findOne({
    where: {
      candidate: { id: candidateProfile.id },
      course: { id: parseInt(courseId) },
      appliedRole,
    },
    relations: ["candidate", "course"],
  });

  if (existingApplication) {
    return res
      .status(409)
      .json({
        error: "You have already applied for this role in this course.",
      });
  }

  const app = AppDataSource.getRepository(CourseApplication).create({
    candidate: candidateProfile,
    course: { id: parseInt(courseId) },
    previousRoles,
    appliedRole,
    availability,
    skills,
    credentials,
  });

  await AppDataSource.getRepository(CourseApplication).save(app);
  res.status(201).json({ message: "Application saved" });
};
