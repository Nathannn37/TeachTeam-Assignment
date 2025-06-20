import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { CourseApplication } from "../entity/CourseApplication";

export const getCandidateApplications = async (req: Request, res: Response) => {
  const apps = await AppDataSource.getRepository(CourseApplication)
    .createQueryBuilder("app")
    .leftJoinAndSelect("app.course", "course")
    .where("app.candidateId = :id", { id: 2 }) // default candidateId
    .select([
      "app.id",
      "app.appliedRole",
      "app.availability",
      "app.skills",
      "app.credentials",
      "course.courseCode",
      "course.courseName"
    ])
    .getRawMany();

  res.json(apps);
};
