import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";

export const submitFeedback = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post("/feedback", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (err) {
            const error = err as AxiosError<Error>
    
    console.log(
      "Error while submitting feedback",
      error.response?.data || error.message
    );
    throw error
  }
};

export const myFeedbacks = async () => {
  try {
    const response = await axiosInstance.get("/feedback");
    // console.log("my feedback", response.data.feedback);
    return response.data.feedback;
  } catch (err) {
        const error = err as AxiosError<Error>;

    console.log(
      "Failed to fetch your feedbacks",
      error.response?.data || error.message
    );
    throw error
  }
};

export const getAllFeedbacks = async () => {
  try {
    const response = await axiosInstance.get("/allfeedback");
    // console.log("all feedback for admin", response.data);
    return response.data.allFeedbacks;
  } catch (err) {
        const error = err as AxiosError<Error>;

    console.log(
      "Failed to fetch all feedbacks",
      error.response?.data || error.message
    );
    throw error
  }
};

export const addReply = async (feedbackId: string, reply: string) => {
  try {
    const response = await axiosInstance.post(`/reply/${feedbackId}`, {reply});
    // console.log("reply", response.data);
    return response.data;
  } catch (err) {
        const error = err as AxiosError<Error>;

    console.log(
      "Failed to fetch all feedbacks",
      error.response?.data || error.message
    );
    throw error
  }
};
