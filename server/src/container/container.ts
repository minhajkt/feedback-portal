import { UserController } from "../controllers/userController";
import { UserRepository } from "../repositories/user/UserRepository";
import { UserService } from "../services/user/UserService";

export function createDependencies() {
  const userRepository = new UserRepository()
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  return { userController };
}
