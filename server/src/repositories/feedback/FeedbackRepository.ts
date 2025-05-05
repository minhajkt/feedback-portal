import mongoose from "mongoose";
import FeedbackModel, { IFeedback } from "../../models/FeedbackModel";
import { BaseRepository } from "../common/BaseRepository";
import { IFeedbackRepository } from "./IFeedbackRepository";

export class FeedbackRepository
  extends BaseRepository<IFeedback>
  implements IFeedbackRepository
{
  constructor() {
    super(FeedbackModel);
  }
  async createFeedback(feedbackData: Partial<IFeedback>): Promise<IFeedback> {
    return await this.create(feedbackData);
  }

  async getFeedbackByUserId(userId: string): Promise<IFeedback[] | null> {
      return await this.find({ userId });
  }

  async getAllFeedBack(): Promise<IFeedback[] | null> {
      return await this.findAll()
  }

  async addReply(feedbackId: string, reply: string): Promise<IFeedback | null> {
      return await this.updateById(feedbackId, {reply})
  }
}