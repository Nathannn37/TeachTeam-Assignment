import { Router } from "express";
import { UserController } from "../controller/UserController";
import { validateDto } from "../middleware/validate";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { ValidateUserDTO } from "../dtos/validate-user.dto";

const router = Router();
const userController = new UserController();

router.get("/users", async (req, res) => {
  await userController.all(req, res);
});

router.post("/users", validateDto(CreateUserDTO), async (req, res) => {
  await userController.save(req, res);
});

router.get("/users/:id", async (req, res) => {
  await userController.one(req, res);
});

router.post("/login", validateDto(ValidateUserDTO), async (req, res) => {
  await userController.login(req, res);
});

export default router;
