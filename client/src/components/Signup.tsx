import { TextField, Button, Typography, Box, Paper, Modal, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, verifyOtp } from "../services/authService";

const Singup = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [otp, setOtp] = useState<string>('')
    const [otpError, setOtpError] = useState<string>('')

    const navigate = useNavigate();

    const handleSignup = async(e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const data = await signup(name, email, password, confirmPassword)
            if(data) {
                // navigate('/login')
                setOpenModal(true)
            }
        } catch (error) {
            console.error('Sign up failed',error);
            setError((error as Error).message)
        }finally{
            setLoading(false)
        }
    }

    const handleVerifyOtp = async() => {
      setLoading(true)
      try {
        const data = await verifyOtp(email, otp) 
        if(data) {
          navigate('/login', {
            state: {otpSuccess: true}
          })
          
        }
      } catch (error) {
        console.error('Error verifying otp', error);
        setOtpError((error as Error).message)
      }finally{ 
        setLoading(false)
      }
    }
    
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: 2,
          width: "100%",
          maxWidth: 450,
          p: 4,
          boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "#334155",
          }}
        >
          Sign up
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSignup}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
            sx={{ mb: 1 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            sx={{ mb: 3 }}
          />

          <TextField
            label="Password"
            type={"password"}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 3 }}
          />
          <TextField
            label="Confirm Password"
            type={"password"}
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              background: "linear-gradient(to right, #4776e6, #8e54e9)",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(142, 84, 233, 0.2)",
              "&:hover": {
                background: "linear-gradient(to right, #3767e6, #7e48df)",
                boxShadow: "0 6px 16px rgba(142, 84, 233, 0.3)",
              },
            }}
          >
            {loading ? <CircularProgress color="info"/> : "Signup"}
          </Button>

          <Box
            sx={{
              mt: 2,
              textAlign: "center",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                "& span": {
                  color: "#4361ee",
                  fontWeight: 500,
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                },
              }}
            >
              Already have an account?{" "}
              <span onClick={() => navigate("/login")}>Login</span>
            </Typography>
          </Box>
        </form>
      </Paper>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            backgroundColor: "white",
            padding: 3,
            margin: "auto",
            marginTop: "20vh",
            borderRadius: 2,
            width: 300,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Enter OTP
          </Typography>
          {otpError && (
            <Typography variant="caption" color="red">
              {otpError}
            </Typography>
          )}
          <TextField
            label="OTP"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleVerifyOtp()}
          >
            {loading ? <CircularProgress /> : "Verify"}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Singup;
