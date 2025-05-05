import { IUser } from "../../models/UserModel";

export interface IUserRepository {
  createUser(userData: Partial<IUser>): Promise<IUser>;
  getUserByEmail(email: string): Promise<IUser | null>

}
