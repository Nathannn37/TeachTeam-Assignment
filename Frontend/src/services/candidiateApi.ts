import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});
export interface Application {
  candidateId: number;
  courseId: number;
  previousRoles: string;
  appliedRole: string;
  availability: string;
  skills: string;
  credentials: string;
}

export const candidateApi = {
  getCourses: async () => {
    const response = await api.get("/courses");
    return response.data;
  },

  applyCourse: async (application: Application) => {
    const response = await api.post("/apply", application);
    return response;
  },
};
