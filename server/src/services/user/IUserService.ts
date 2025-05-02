import { IUser } from "../../models/IUser";

export interface IUserService {
  createUser(userData: Partial<IUser>, confirmPassword: string): Promise<IUser>;
  verifyOtp(email: string, otp: string): Promise<IUser | null>;
  loginUser(email: string, password: string, role: string): Promise<{user: IUser, token: string}>;
}
