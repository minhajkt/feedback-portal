/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Paper, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { myFeedbacks } from "../services/feedbackService";
import { IFeedback } from "../interfaces/interfaces";

export const MyFeedbacks = () => {

    const [feedbacks, setFeedbacks] = useState<IFeedback[]>([])
    const [error, setError] = useState<string>('')

    useEffect(() => {
        const fetchFeedbacks = async() => {
            try {
                const data = await myFeedbacks()
                if(data) {
                    setFeedbacks(data)
                }
            } catch (error) {
                console.error('Failed to fetch feedback', error);
                setError((error as Error).message)
            }
        }
        fetchFeedbacks()
    }, [])

  return (
    <Box sx={{ width: "100%", maxWidth: 600 }}>
      {feedbacks.length > 0 ? (
        feedbacks.map((feedback, index) => (
          <Paper key={index} elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="body1">{feedback.text}</Typography>
            <Rating
              value={feedback.rating}
              precision={0.5}
              readOnly
              size="small"
            />
            {feedback.reply && (
              <Box display="flex" alignItems="center">
                <img
                  src="/new.png"
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 8,
                    marginLeft: 20,
                  }}
                  alt=""
                />
                <Typography variant="body1">{feedback.reply}</Typography>
              </Box>
            )}
            <br />

            {feedback.image && (
              <img
                src={`http://localhost:3000/${feedback.image}`}
                alt="feedback"
                style={{ width: "15rem" }}
              />
            )}
          </Paper>
        ))
      ) : (
        <Typography>No feedbacks available.</Typography>
      )}
    </Box>
  );
}

export default MyFeedbacks