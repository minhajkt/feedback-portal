import { IFeedback } from "../../models/FeedbackModel";

export interface IFeedbackService {
  createFeedback(feedbackData: Partial<IFeedback>): Promise<IFeedback>;
  getFeedbackByUserId(userId: string): Promise<IFeedback[] | null>;
  getAllFeedback(): Promise<IFeedback[] | null>
  addReply(feedbackId: string, reply: string): Promise<IFeedback | null>
}