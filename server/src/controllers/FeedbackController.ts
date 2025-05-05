import { Request, Response } from "express";
import { IFeedbackService } from "../services/feedback/IFeedbackService";

export class FeedbackController {
  private feedbackService: IFeedbackService;
  constructor(feedbackService: IFeedbackService) {
    this.feedbackService = feedbackService;
  }

  async createFeedback(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const { text, rating } = req.body;
      const image = req.file?.path || "";

      const imagePath = req.file?.path ? req.file.path.replace(/\\/g, "/") : "";

      const feedbackData = { userId, text, rating, image: imagePath };
      const feedback = await this.feedbackService.createFeedback(feedbackData);

      res.status(201).json({ message: "Feedback Sumbmitted", feedback });
      return; 
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
      return; 
    }
  }

  async getFeedback(req: Request, res: Response): Promise<void> {
    try {
        const userId = (req as any).user.id

        const feedback = await this.feedbackService.getFeedbackByUserId(userId)
        // console.log('fetched feedback', feedback)
        feedback?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        res.status(200).json({message: 'Feedback Fetched', feedback})
    } catch (error) {
        res.status(500).json({error: (error as Error).message})
    }
  }

  async getAllFeedback(req: Request, res: Response): Promise<void> {
    try {
        const allFeedbacks = await this.feedbackService.getAllFeedback()
        allFeedbacks?.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        res.status(200).json({message: "All feedbacks fetched", allFeedbacks})
    } catch (error) {
        res.status(500).json({message: (error as Error).message})
    }
  }

  async addReply(req: Request, res: Response): Promise<void> {
    try {
        const {reply } = req.body
        const {feedbackId } = req.params
        if (!reply || !feedbackId) {
          res
            .status(400)
            .json({ message: "Reply and feedbackId are required" });
          return;
        }
        const replyData = await this.feedbackService.addReply(feedbackId, reply)
        res.status(201).json({message: "Reply added successfully", replyData})
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });        
    }
  }
}

