import React, { useState } from "react";
import { Link, Typography, useTheme, Box } from "@mui/material";
import LoginForm from "../components/LoginForm";
import CreateKey from "../components/CreateKey";
import logo from "../assets/logo.png";

export default function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        borderRadius={theme.shape.borderRadius}
        sx={{
          width: theme.breakpoints.values.sm,
          //bgcolor: "#EFF3F4",
          padding: " 3rem 2rem",
          background: 'linear-gradient(to right bottom, #9D50BB, #6E48AA)'
        }}
      >
        <Box textAlign="center" marginBottom="1rem">
          <img
            src={logo}
            alt="Logo"
            width="150px"
          />
        </Box>
        {isLoginForm ? (
        <Typography variant="h5" color={"white"}>Login to your account</Typography>
        ) : (
          <Typography variant="h5" color={"white"}>Create a new profile</Typography>
        )} 
        {isLoginForm ? 
        <LoginForm />
         : <CreateKey />} 
         {isLoginForm ? ( 
        <Box textAlign="center" margin=".5rem 0" color={"white"}>
          Don't have a profile?{" "}
          <Link
            style={{ textDecoration: "none", cursor: "pointer" }}
           onClick={() => setIsLoginForm(false)}
          >
            Create one
          </Link>
        </Box>
         ) : (
          <Box textAlign="center" margin=".5rem 0" color={"white"}>
            Already have a profile?{" "}
            <Link
              style={{ textDecoration: "none", cursor: "pointer" }}
              onClick={() => setIsLoginForm(true)}
            >
              Sign in
            </Link>
          </Box>
        )} 
      </Box>
    </Box>
  );
}
