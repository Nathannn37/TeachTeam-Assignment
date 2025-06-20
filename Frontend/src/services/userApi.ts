import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
}

export const userApi = {
  getAllUsers: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  getUserById: async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  createUser: async (user: Partial<User>) => {
    const response = await api.post("/users", user);
    return response.data;
  },

  loginUser: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });
      return response.data;
    } catch (error: unknown) {
      // Use axios.isAxiosError to check for Axios errors
      if (
        axios.isAxiosError(error) &&
        error.response &&
        (error.response.status === 401 || error.response.status === 404)
      ) {
        return null; // or throw new Error("Invalid credentials");
      }
      throw error; // Only throw for unexpected errors
    }
  },
};
