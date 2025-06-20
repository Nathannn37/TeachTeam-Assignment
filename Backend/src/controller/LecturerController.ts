import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { CourseApplication } from "../entity/CourseApplication";
import { Lecturer } from "../entity/Lecturer";

export const getLecturerApplicants = async (req: Request, res: Response) => {
  const {
    lecturerId,
    name = "",
    role = "",
    availability = "",
    skill = "",
  } = req.query;

  const query = AppDataSource.getRepository(CourseApplication)
    .createQueryBuilder("app")
    .leftJoin("app.course", "course")
    .leftJoin("course.lecturerLinks", "link")
    .leftJoin("link.lecturer", "lecturer")
    .leftJoin("app.candidate", "candidate")
    .select([
      "app.id AS app_id",
      "app.appliedRole",
      "app.availability",
      "app.skills",
      "app.credentials",
      "candidate.firstName",
      "candidate.lastName",
      "course.courseCode",
      "course.courseName",
    ])
    .distinct(true);

  // Checks if lecturerId is a string, array or undefined and makes it a string
  const lecturerIdStr =
    typeof lecturerId === "string"
      ? lecturerId
      : Array.isArray(lecturerId) && typeof lecturerId[0] === "string"
      ? lecturerId[0]
      : undefined;

  if (!lecturerIdStr) {
    return res.status(400).json({ error: "lecturerId is required" });
  }
  const lecturer = await AppDataSource.getRepository(Lecturer).findOne({
    where: { id: parseInt(lecturerIdStr) },
    relations: ["user"],
  });
  if (!lecturer) {
    return res.status(400).json({ error: "lecturer profile not found" });
  }

  query.where("lecturer.id = :id", { id: lecturer.id });

  if (name) {
    query.andWhere(
      "LOWER(candidate.firstName || ' ' || candidate.lastName) LIKE :name",
      { name: `%${(name as string).toLowerCase()}%` }
    );
  }

  if (role) {
    query.andWhere("app.appliedRole = :role", { role });
  }

  if (availability) {
    query.andWhere("app.availability = :availability", { availability });
  }

  if (skill) {
    query.andWhere("app.skills LIKE :skill", {
      skill: `%${skill}%`,
    });
  }

  const results = await query.getRawMany();

  const mapped = results.map((r: any) => ({
    applicationId: r.app_id,
    fullName: `${r.candidate_firstName} ${r.candidate_lastName}`,
    courseName: r.course_courseName,
    courseCode: r.course_courseCode,
    availability: r.app_availability,
    appliedRole: r.app_appliedRole,
    skills: r.app_skills,
    credentials: r.app_credentials,
  }));

  res.json(mapped);
};
