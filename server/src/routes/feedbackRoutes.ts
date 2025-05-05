import { Router } from "express";
import { createDependencies } from "../container/container";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { isAdmin } from "../middlewares/isAdmin";
import { upload } from "../middlewares/multer";

const router = Router()

const {feedbackController} = createDependencies()

router.post('/feedback', authenticateJWT , upload.single('image'), feedbackController.createFeedback.bind(feedbackController))
router.get('/feedback', authenticateJWT, feedbackController.getFeedback.bind(feedbackController))
router.get('/allfeedback', authenticateJWT, isAdmin, feedbackController.getAllFeedback.bind(feedbackController))
router.post('/reply/:feedbackId', authenticateJWT, isAdmin ,feedbackController.addReply.bind(feedbackController))

export default router;