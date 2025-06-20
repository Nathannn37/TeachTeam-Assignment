import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export interface Review {
  applicationId: number;
  selected?: boolean;
  rank?: number;
  comment?: string;
}

export const lecturerApi = {
  getApplicants: async (params: Record<string, string | number>) => {
    const searchParams = new URLSearchParams(params as Record<string, string>);
    const response = await api.get(
      `/lecturer/applicants?${searchParams.toString()}`
    );
    return response.data;
  },

  getReviewed: async (lecturerId: number) => {
    const response = await api.get(
      `/lecturer/reviewed?lecturerId=${lecturerId}`
    );
    return response.data;
  },

  getReviewStats: async () => {
    const response = await api.get("/lecturer/review-stats");
    return response.data;
  },

  saveReview: async (review: {
    applicationId: number;
    selected: boolean;
    rank: number;
    comment: string;
    lecturerId: number;
  }) => {
    const response = await api.post("/lecturer/review", review);
    return response.data;
  },
};
