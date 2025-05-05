import {  useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Rating,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { submitFeedback } from "../services/feedbackService";
import MyFeedbacks from "./MyFeedbacks";

const Home = () => {
    const [text, setText] = useState<string>('')
    const [rating, setRating] = useState<number | null>(0)
    const [image, setImage] = useState<File | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>('')
  const navigate = useNavigate();
  const {user, setUser} = useAuth()
  


  useEffect(() => {
    const message = localStorage.getItem("loginSnackbarMsg");
    if(message) {
        setSnackbar(true)
        setSnackbarMessage(message)
        localStorage.removeItem("loginSnackbarMsg");
    }
  }, [])


  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null)
      localStorage.removeItem('user')
      navigate("/");
    } catch (error) {
      console.error("Error logging  out", error);
      setError("Failed to logout");
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async() => {
    try {
        const finalRating = rating ?? 0

        const formData = new FormData()
        formData.append('text', text)
        formData.append('rating', finalRating.toString())
        if (image) {
          formData.append("image", image);
        }
        const data = await submitFeedback(formData)
        if(data) {
            setSnackbar(true)
            setSnackbarMessage('Feedback submitted successfully')
            setText('')
            setRating(0)
            setImage(null)
        }
    } catch (error) {
        console.error('Failed to submit feedback', error);
        setError((error as Error).message)
    }
  }

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

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, mr: 2 }}>
        <IconButton
          onClick={handleLogout}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <img
            src="/power-off.png"
            alt="Logout"
            style={{ width: 24, height: 24 }}
          />
        </IconButton>
      </Box>

      <Box sx={{ maxWidth: 700, mx: "auto" }}>
        <Paper
          elevation={6}
          sx={{
            borderRadius: 3,
            p: 4,
            mb: 6,
            boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)",
          }}
        >
          <Typography
            variant="h6"
            align="left"
            sx={{ fontWeight: 600, mb: 1, color: "#334155" }}
          >
            Hello {user?.name || ''} Submit your Feedback
          </Typography>

          <TextField
            label="Your Feedback"
            multiline
            rows={4}
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            margin="normal"
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 2 }}>
            <Typography sx={{ color: "#334155" }}>Rating:</Typography>
            <Rating
              name="rating"
              value={rating}
              precision={0.5}
              onChange={(_, newValue) => setRating(newValue)}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 2 }}>
            <label htmlFor="image-upload">
              <Button variant="outlined" component="span">
                Upload Image
              </Button>
            </label>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload"
              type="file"
              onChange={handleImageChange}
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
              />
            )}
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={!rating || !text}
            sx={{
              py: 1.5,
              mt: 2,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              // background: "linear-gradient(to right, #4776e6, #8e54e9)",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(142, 84, 233, 0.2)",
              "&:hover": {
                background: "linear-gradient(to right, #3767e6, #7e48df)",
              },
            }}
          >
            Submit Feedback
          </Button>
        </Paper>

        <Paper elevation={4} sx={{ borderRadius: 3, p: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, mb: 2, color: "#334155" }}
          >
            Your Feedbacks
          </Typography>

          <MyFeedbacks />
        </Paper>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbar}
        onClose={() => setSnackbar(false)}
        message={snackbarMessage}
        autoHideDuration={3000}
      />
    </Box>
  );
};

export default Home;
