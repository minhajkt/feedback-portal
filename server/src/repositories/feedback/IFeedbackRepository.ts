import { IFeedback } from "../../models/FeedbackModel";

export interface IFeedbackRepository {
  createFeedback(feedbackData: Partial<IFeedback>): Promise<IFeedback>;
//   getFeedbackById(userId: string): Promise<IFeedback | null>;
  getFeedbackByUserId(userId: string): Promise<IFeedback[] | null>;
  getAllFeedBack(): Promise<IFeedback[] | null>
  addReply(feedbackId:string ,reply: string): Promise<IFeedback | null>
}