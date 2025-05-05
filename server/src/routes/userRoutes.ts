import { Router } from "express";
import { formatDiagnostic } from "typescript";
import { createDependencies } from "../container/container";
import { isAdmin } from "../middlewares/isAdmin";
import { handleValidationErrors, validateLogin, validateUserSignup } from "../middlewares/validation";

const router = Router()

const {userController} = createDependencies()

router.post('/signup',validateUserSignup, handleValidationErrors, userController.createUser.bind(userController))
router.post('/verify', userController.verifyOTP.bind(userController))
router.post('/login', validateLogin, handleValidationErrors,userController.loginUser.bind(userController))
router.post('/logout', userController.logoutUser.bind(userController))

router.post('/admin/login', userController.loginAdmin.bind(userController))

export default router;