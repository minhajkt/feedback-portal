import { IUser } from "../../models/UserModel";
import { IUserRepository } from "../../repositories/user/IUserRepository";
import { UserRepository } from "../../repositories/user/UserRepository";
import { comparePassword, hashPassword } from "../../utils/hashingotp";
import { generateToken } from "../../utils/jwtUtils";
import { sendOtpToEmail, storeOtp, validateOtp } from "../../utils/otpUtils";
import { IUserService } from "./IUserService";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(
    userData: Partial<IUser>,
    confirmPassword: string
  ): Promise<IUser> {
    try {
      if (userData.password !== confirmPassword) {
        throw new Error("Password should match");
      }

      const existingUser = await this.userRepository.getUserByEmail(
        userData.email as string
      );
      if (existingUser) {
        if (!existingUser.isVerified) {
          const otp = await sendOtpToEmail(userData.email as string);
          storeOtp(userData.email as string, otp);
          return existingUser;
        } else {
          throw new Error("Email already exists");
        }
      }

      const hashedPassword = await hashPassword(userData.password as string);
      userData.password = hashedPassword;
      const otp = await sendOtpToEmail(userData.email as string);
      storeOtp(userData.email as string, otp);

      return await this.userRepository.createUser(userData);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async verifyOtp(email: string, otp: string): Promise<IUser | null> {
    try {
      const isOtpValid = await validateOtp(email, otp);
      if (!isOtpValid) {
        throw new Error("Invalid or expired OTP.");
      }

      const user = await this.userRepository.getUserByEmail(email);
      if (user) {
        user.isVerified = true;
        await user.save();
        return user;
      }

      throw new Error("User not found.");
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email: string, password: string, role: string): Promise<{user: IUser, token: string}> {
    try {
      const user = await this.userRepository.getUserByEmail(email as string);
      if (!user) {
        throw new Error("User does not exist");
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid Credentials");
      }

      if (!user.isVerified) {
        throw new Error("Please verify your email before logging in.");
      }

      if(role === 'admin' && user.role !== 'admin') {
        throw new Error('Only admin can access')
      }

      const token = generateToken({ id: user?._id, email: user?.email, role : user?.role });
    //   console.log(token)
      return {user, token};
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
}
