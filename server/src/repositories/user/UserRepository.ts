import userModel, { IUser } from "../../models/UserModel";
import { BaseRepository } from "../common/BaseRepository";
import { IUserRepository } from "./IUserRepository";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor() {
        super(userModel)
    }

    async createUser(userData: Partial<IUser>): Promise<IUser> {
        return await this.create(userData)
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        return await this.findByEmail(email)
    }
}