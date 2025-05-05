import {
  Box,
  Button,
  IconButton,
  Paper,
  Rating,
  TextField,
  Typography, Snackbar,
} from "@mui/material";
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { IFeedback } from "../interfaces/interfaces";
import { addReply, getAllFeedbacks } from "../services/feedbackService";

const AdminDashboard = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const [reply, setReply] = useState<{ [key: string]: string }>({});
  const [snackbar,setSnackbar] = useState(false)

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Error logging  out", error);
    }
  };

  const handleReply = async (feedbackId: string, reply: string) => {
    try {
      const data = await addReply(feedbackId, reply);
      if (data) {
        setSnackbar(true);
        setReply((prev) => ({ ...prev, [feedbackId]: "" }));
      }
    } catch (error) {
      console.error("Error adding reply", error);
    }
  };

  useEffect(() => {
    const getFeedbacks = async () => {
      const data = await getAllFeedbacks();
      if (data) {
        setFeedbacks(data);

        const initialReplies: { [key: string]: string } = {};
        data.forEach((feedback: IFeedback) => {
          initialReplies[feedback._id] = ""; 
        });
        setReply(initialReplies); 
      }
    };
    getFeedbacks();
  }, []);


  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
        py: 6,
        px: 2,
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        <IconButton onClick={handleLogout}>
          <img
            src="/power-off.png"
            alt="Logout"
            style={{ width: 24, height: 24 }}
          />
        </IconButton>
      </Box>

      <Box sx={{ width: "100%", maxWidth: 800, mx: "auto" }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          User Feedbacks
        </Typography>

        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <Paper
              key={feedback._id}
              elevation={3}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 2,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
              }}
            >
              <Typography sx={{ mb: 2, fontWeight: 600 }}>
                {feedback.userId.name}
              </Typography>
              <Rating
                value={feedback.rating}
                precision={0.5}
                readOnly
                size="small"
                sx={{ mb: 2 }}
              />
              <Typography variant="body1" sx={{ mb: 2 }}>
                {feedback.text}
              </Typography>
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
              {feedback.image && (
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <img
                    src={`http://localhost:3000/${feedback.image}`}
                    alt="feedback"
                    style={{
                      width: "15rem",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                </Box>
              )}
              {!feedback.reply && (
                <>
                  <TextField
                    label="Add a Reply"
                    variant="outlined"
                    fullWidth
                    value={reply[feedback._id || ""]}
                    onChange={(e) =>
                      setReply({ ...reply, [feedback._id]: e.target.value })
                    }
                    margin="normal"
                    required
                    sx={{ mb: 3 }}
                  />

                  <Button
                    variant="contained"
                    disabled={!reply[feedback._id || ""]}
                    onClick={() =>
                      handleReply(feedback._id, reply[feedback._id] || "")
                    }
                  >
                    Reply
                  </Button>
                </>
              )}
            </Paper>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
            No feedbacks available.
          </Typography>
        )}
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbar}
        onClose={() => setSnackbar(false)}
        autoHideDuration={3000}
        message="Reply addedd successfully"
      />
    </Box>
  );
};

export default AdminDashboard;
