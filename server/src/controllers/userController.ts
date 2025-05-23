import { Request, Response } from "express";
import { IUserService } from "../services/user/IUserService";
import { IUser } from "../models/UserModel";

export class UserController {
    private userService: IUserService
    constructor(userService: IUserService) {
        this.userService = userService
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password, confirmPassword } = req.body;

            const userData: Partial<IUser> = { name, email, password };
            const user = await this.userService.createUser(userData, confirmPassword)
            res.status(201).json({message : "User created successfully", user})
        } catch (error) {
            console.log('Error while creating user', (error as Error).message)
            res.status(500).json({error: (error as Error).message})
        }
    }

    async verifyOTP(req: Request, res: Response) : Promise<void> {
        try {
            const {email, otp} = req.body
            if(!otp) {
                res.status(404).json({message : "OTP is required"})
                return
            }

            const user = await this.userService.verifyOtp(email, otp)
            if(user) {
               res.status(200).json({message : 'OTP verification success'}) 
            }else {
                res.status(400).json({message: "OTP verification failed"})
            }
        } catch (error) {
            res.status(500).json({error: (error as Error).message})
        }
    }
 
    async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const {email, password} = req.body
            const {user, token} = await this.userService.loginUser(email, password, 'user')
            
            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: "strict",
                maxAge: 60 * 60 * 1000
            })

            res.status(200).json({message : 'Login success', user})
        } catch (error) {
            res
              .status(500)
              .json({error: (error as Error).message});
        }
    }

    async loginAdmin(req: Request, res: Response): Promise<void> {
        try {
            const {email, password} = req.body
            const {user, token} = await this.userService.loginUser(email, password, 'admin')
            
            res.status(200).json({message : 'Admin login success', user, token})
        } catch (error) {
            res
              .status(500)
              .json({error: (error as Error).message});
        }
    }

    async logoutUser(req: Request, res: Response) : Promise<void> {
        try {
            res.clearCookie("accessToken", {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
            });
            res.status(200).json({message : "Logout success"})
        } catch (error) {
            res.status(500).json({error : (error as Error).message})
        }
    }
}