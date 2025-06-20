export type Role = "Lecturer" | "Candidate" | "Admin";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  password: string;
  dateJoined: Date;
  lecturerId?: string;
};

// export const DEFAULT_USERS: User[] = [
//   {
//     id: "1",
//     name: "Alice Nguyen",
//     username: "Alice@gmail.com",
//     password: "Password123",
//     role: "Tutor",
//   },
//   {
//     id: "2",
//     name: "Bao Tran",
//     username: "Bao@gmail.com",
//     password: "Password456",
//     role: "Tutor",
//   },
//   {
//     id: "11",
//     name: "Alicia Huang",
//     username: "Alicia@gmail.com",
//     password: "Password123",
//     role: "Tutor",
//   },
//   {
//     id: "12",
//     name: "Jack Wong",
//     username: "Jack@gmail.com",
//     password: "Password456",
//     role: "Lecturer",
//   },
// ];
