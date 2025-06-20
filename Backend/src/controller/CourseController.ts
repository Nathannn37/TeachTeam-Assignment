// CourseController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await AppDataSource.getRepository(Course).find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to load courses" });
  }
};
