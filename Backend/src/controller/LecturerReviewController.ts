import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { LecturerReview } from "../entity/LecturerReview";
import { CourseApplication } from "../entity/CourseApplication";

export const saveLecturerReview = async (req: Request, res: Response) => {
  const { applicationId, selected, rank, comment, lecturerId } = req.body;

  const reviewRepo = AppDataSource.getRepository(LecturerReview);
  const lecturerRepo = AppDataSource.getRepository("Lecturer");
  const appRepo = AppDataSource.getRepository(CourseApplication);

  // Checks if lecturerId and applicationId exist
  const lecturer = await lecturerRepo.findOne({ where: { id: lecturerId } });
  const application = await appRepo.findOne({ where: { id: applicationId } });

  if (!lecturer || !application) {
    return res.status(400).json({ error: "Lecturer or Application not found" });
  }
  // Gets the review matching lecturerId and applicationId
  let review = await reviewRepo.findOne({
    where: {
      lecturer: { id: lecturerId },
      application: { id: applicationId },
    },
  });

  // If there isn't one create one
  if (!review) {
    review = reviewRepo.create({
      lecturer,
      application,
    });
  }

  review.selected = selected;
  review.rank = rank;
  review.comment = comment;

  await reviewRepo.save(review);
  res.json({ message: "Review saved" });
};

export const getLecturerReviews = async (req: Request, res: Response) => {
  const lecturerId = req.query.lecturerId;
  const reviews = await AppDataSource.getRepository(LecturerReview)
    .createQueryBuilder("review")
    .leftJoinAndSelect("review.application", "app")
    .select([
      "review.id",
      "review.rank",
      "review.comment",
      "review.selected",
      "app.id",
    ])
    .where("review.lecturerId = :id", { id: lecturerId })
    .getRawMany();

  const mapped = reviews.map((r) => ({
    applicationId: r.app_id,
    rank: r.review_rank,
    comment: r.review_comment,
    selected: r.review_selected,
  }));

  res.json(mapped);
};
