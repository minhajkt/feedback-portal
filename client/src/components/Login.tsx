/* eslint-disable @typescript-eslint/no-unused-vars */
import { TextField, Button, Typography, Box, Paper, Snackbar } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import React, {  useState } from "react";
import { loginUser } from "../services/authService";
import { useLocation, useNavigate } from "react-router-dom";

    const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { user, setUser } = useAuth();
    const location = useLocation()
    const [snackbar, setSnackbar] = useState<boolean>(location.state?.otpSuccess || false);

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
        const data = await loginUser(email, password);
        if (data) {
            setUser(data.user);
            if(data.user.role === 'user') {
                navigate("/home");
            }else {
                navigate('/admin')
            }
        }
        } catch (error) {
        console.error("Login failed", error);
        setError("Invalid email or password");
        } finally {
        setLoading(false);
        }
    };



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
          Login
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleLogin}>
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
            Log In
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
              Don't have an account?{" "}
              <span onClick={() => navigate("/signup")}>Sign up</span>
            </Typography>
          </Box>
        </form>
      </Paper>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbar}
        onClose={() => setSnackbar(false)}
        message="OTP Verification success. You can now login"
        autoHideDuration={3000}
      />
    </Box>
  );
};

export default Login;
