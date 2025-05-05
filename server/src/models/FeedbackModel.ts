

import mongoose, { Document, Schema } from "mongoose";

export interface IFeedback extends Document {
  userId: string;
  text: string
  rating: string
  image: string
  reply: string
  createdAt: Date
}

const FeedbackSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    image: { type: String },
    reply: {type: String}
  },
  { timestamps: true }
);

export default mongoose.model<IFeedback>("Feedback", FeedbackSchema);
