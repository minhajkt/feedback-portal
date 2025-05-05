import { FeedbackService } from "../src/services/feedback/FeedbackService";
import { IFeedbackRepository } from "../src/repositories/feedback/IFeedbackRepository";
import { IFeedback } from "../src/models/FeedbackModel";


describe("FeedbackService", () => {
  let mockRepo: jest.Mocked<IFeedbackRepository>;
  let service: FeedbackService;

  beforeEach(() => {
    mockRepo = {
      createFeedback: jest.fn(),
      getFeedbackByUserId: jest.fn(),
      getAllFeedBack: jest.fn(),
      addReply: jest.fn(),
    } as unknown as jest.Mocked<IFeedbackRepository>;
    service = new FeedbackService(mockRepo);
  });

  it("should create feedback", async () => {
    const feedbackData = { text: "Great", rating: 5 } as Partial<IFeedback>;
    const createdFeedback = { ...feedbackData, _id: "abc" } as IFeedback;
    mockRepo.createFeedback.mockResolvedValue(createdFeedback);

    const result = await service.createFeedback(feedbackData);

    expect(result).toEqual(createdFeedback);
    expect(mockRepo.createFeedback).toHaveBeenCalledWith(feedbackData);
  });

  it("should get feedback by user ID", async () => {
    const userId = "user123";
    const mockFeedbackList = [{ text: "Nice", rating: 4 }] as IFeedback[];
    mockRepo.getFeedbackByUserId.mockResolvedValue(mockFeedbackList);

    const result = await service.getFeedbackByUserId(userId);

    expect(result).toEqual(mockFeedbackList);
    expect(mockRepo.getFeedbackByUserId).toHaveBeenCalledWith(userId);
  });

  it("should get all feedback", async () => {
    const allFeedback = [{ text: "Hello", rating: 5 }] as IFeedback[];
    mockRepo.getAllFeedBack.mockResolvedValue(allFeedback);

    const result = await service.getAllFeedback();

    expect(result).toEqual(allFeedback);
    expect(mockRepo.getAllFeedBack).toHaveBeenCalled();
  });

  it("should add a reply", async () => {
    const feedbackId = "feed123";
    const reply = "Thanks!";
    const updatedFeedback = { _id: feedbackId, reply } as IFeedback;
    mockRepo.addReply.mockResolvedValue(updatedFeedback);

    const result = await service.addReply(feedbackId, reply);

    expect(result).toEqual(updatedFeedback);
    expect(mockRepo.addReply).toHaveBeenCalledWith(feedbackId, reply);
  });
});
