import { IFeedback } from "../../models/FeedbackModel";
import { IFeedbackRepository } from "../../repositories/feedback/IFeedbackRepository";
import { IFeedbackService } from "./IFeedbackService";

export class FeedbackService implements IFeedbackService {
  private feedbackRepository: IFeedbackRepository;
  constructor(feedackRepository: IFeedbackRepository) {
    this.feedbackRepository = feedackRepository;
  }

  async createFeedback(feedbackData: Partial<IFeedback>): Promise<IFeedback> {
    try {
      const feedback = await this.feedbackRepository.createFeedback(
        feedbackData
      );
      return feedback;
    } catch (error) {
      console.log("Error creating feedback", error);
      throw error;
    }
  }

  async getFeedbackByUserId(userId: string): Promise<IFeedback[] | null> {
    try {
      return await this.feedbackRepository.getFeedbackByUserId(userId);
    } catch (error) {
      throw error;
    }
  }

  async getAllFeedback(): Promise<IFeedback[] | null> {
      try {
        return await this.feedbackRepository.getAllFeedBack()
      } catch (error) {
        throw error
      }
  }

  async addReply(feedbackId: string, reply: string): Promise<IFeedback | null> {
      try {
        return await this.feedbackRepository.addReply(feedbackId, reply)
      } catch (error) {
        throw error
      }
  }
}