import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Unauthorized = () => {
  const navigate = useNavigate();
    const {user} = useAuth()
  const handleGoBack = () => {
    if(user.role !== 'admin') {
        navigate('/home')
    }else if(!user) {
        navigate('/login')
    }
  }

  return (
    <Box
      sx={{
        bgcolor: "#e0e0e0",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h1" color="initial" fontWeight={"semi-bold"}>
        403
      </Typography>
      <Typography variant="h6" color="initial">
        Oops! You are not authorized !!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        sx={{ mt: 2 }}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default Unauthorized;
