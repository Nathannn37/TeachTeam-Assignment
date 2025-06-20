// ✅ Fixed version of getGlobalReviewStats controller
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { LecturerReview } from "../entity/LecturerReview";

export const getGlobalReviewStats = async (req: Request, res: Response) => {
  const reviewRepo = AppDataSource.getRepository(LecturerReview);

  const result = await reviewRepo
    .createQueryBuilder("review")
    .leftJoin("review.application", "app")
    .leftJoin("app.candidate", "candidate")
    .select("review.applicationId", "applicationId")
    .addSelect("candidate.firstName", "firstName")
    .addSelect("candidate.lastName", "lastName")
    .addSelect("COUNT(*)", "count")
    .where("review.selected = true")
    .groupBy("review.applicationId")
    .addGroupBy("candidate.firstName")
    .addGroupBy("candidate.lastName")
    .getRawMany();

  const allApps = await reviewRepo
    .createQueryBuilder("review")
    .leftJoin("review.application", "app")
    .leftJoin("app.candidate", "candidate")
    .select("review.applicationId", "applicationId")
    .addSelect("candidate.firstName", "firstName")
    .addSelect("candidate.lastName", "lastName")
    .groupBy("review.applicationId")
    .addGroupBy("candidate.firstName")
    .addGroupBy("candidate.lastName")
    .getRawMany();

  const selectedAppIds = new Set(result.map((r) => r.applicationId));
  const unselected = allApps
    .filter((r) => !selectedAppIds.has(r.applicationId))
    .map((r) => ({ fullName: `${r.firstName} ${r.lastName}` }));

  let mostChosen = { fullName: "N/A", count: "0" };
  let leastChosen = { fullName: "N/A", count: "0" };

  if (result.length > 0) {
    const max = result.reduce((max, curr) =>
      parseInt(curr.count) > parseInt(max.count) ? curr : max
    );
    const min = result.reduce((min, curr) =>
      parseInt(curr.count) < parseInt(min.count) ? curr : min
    );

    mostChosen = {
      fullName: `${max.firstName} ${max.lastName}`,
      count: max.count,
    };
    leastChosen = {
      fullName: `${min.firstName} ${min.lastName}`,
      count: min.count,
    };
  }

  return res.json({
    mostChosen,
    leastChosen,
    unselected,
  });
};
