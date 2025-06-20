import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import argon2 from "argon2";
import { CandidateProfile } from "../entity/CandidateProfile";
import { Lecturer } from "../entity/Lecturer";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  /**
   * Retrieves all users from the database
   * @param request - Express request object
   * @param response - Express response object
   * @returns JSON response containing an array of all tutorials
   */
  async all(request: Request, response: Response) {
    const users = await this.userRepository.find();
    return response.json(users);
  }

  /**
   * Retrieves a single user by its ID
   * @param request - Express request object containing the tutorial ID in params
   * @param response - Express response object
   * @returns JSON response containing the tutorial if found, or 404 error if not found
   */
  async one(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    return response.json(user);
  }

  /**
   * Creates a new user in the database
   * @param request - Express request object containing tutorial details in body
   * @param response - Express response object
   * @returns JSON response containing the created tutorial or error message
   */
  async save(request: Request, response: Response) {
    const { firstName, lastName, email, role, password } = request.body;
    // Checks in the database if a user already has the same email, if so returns
    // a 409 status and stops
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) {
      return response.status(409).json({ message: "Email already registered" });
    }

    // [4] Used argon2 library to hash the password before sending to database
    const hashedPassword = await argon2.hash(password);

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword,
    });
    // Saves the newUser to the database with hashed password
    try {
      const savedUser = await this.userRepository.save(user);
      const { password, ...userWithoutPassword } = savedUser;
      // If the role is Candidate then links user to Candidate table
      if (role === "Candidate") {
        const candidateProfile = new CandidateProfile();
        candidateProfile.firstName = firstName;
        candidateProfile.lastName = lastName;
        candidateProfile.user = savedUser;
        await AppDataSource.getRepository(CandidateProfile).save(
          candidateProfile
        );
      }
      // If the role is Lecturer then links user to Lecturer table
      if (role === "Lecturer") {
        const lecturerProfile = new Lecturer();
        lecturerProfile.firstName = firstName;
        lecturerProfile.lastName = lastName;
        lecturerProfile.user = savedUser;
        await AppDataSource.getRepository(Lecturer).save(lecturerProfile);
      }
      // Returns user information without the password
      return response.status(201).json(userWithoutPassword);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error creating user", error });
    }
  }

  // Used to login existing users
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      // Finds user in the database by email and lecturerProfile if user role is lecturer
      const user = await this.userRepository.findOne({
        where: { email },
        relations: ["lecturerProfile"],
      });
      // Returns error if no matching email in database
      if (!user) {
        return response.status(404).json({ message: "No matching email" });
      }
      // [4] Returns error if password doesn't match hashed password using argon2
      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        return response.status(401).json({ message: "Incorrect password" });
      }

      // Excludes password before sending user data
      const { password: _, ...userWithoutPassword } = user;
      // If user role is lecturer, add lecturerId
      let User = userWithoutPassword;
      if (user.lecturerProfile) {
        User = {
          ...userWithoutPassword,
          lecturerId: user.lecturerProfile.id,
        } as typeof userWithoutPassword & { lecturerId: number };
      }

      return response.status(200).json(User);
    } catch (error) {
      return response.status(500).json({ message: "Login failed", error });
    }
  }
}
