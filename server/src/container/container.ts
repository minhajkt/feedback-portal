import { FeedbackController } from "../controllers/FeedbackController";
import { UserController } from "../controllers/userController";
import { FeedbackRepository } from "../repositories/feedback/FeedbackRepository";
import { UserRepository } from "../repositories/user/UserRepository";
import { FeedbackService } from "../services/feedback/FeedbackService";
import { UserService } from "../services/user/UserService";

export function createDependencies() {
  const userRepository = new UserRepository()
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  const feedbackRepository = new FeedbackRepository()
  const feedbackService = new FeedbackService(feedbackRepository)
  const feedbackController = new FeedbackController(feedbackService)

  return { userController, feedbackController };
}
