import {
  Button,
  CircularProgress,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
//import { registerUser } from "../redux/authSlice";

export default function CreateKey() {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  //const { status, isLoggedIn } = useSelector((state) => state.auth);
  const status = "success";

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // dispatch(registerUser(registerData));
  //     navigate("/home");
  //   };

  const navigateHome = () => {
    // dispatch(registerUser(registerData));
    navigate("/profile");
  };
  //   useEffect(() => {
  //     if (isLoggedIn) {
  //       history.push("/");
  //     }
  //   }, [isLoggedIn, history]);

  return (
    <Box>
      <Typography>
        Press the button below to create a brand new profile
      </Typography>
      <Button
        type="submit"
        sx={{
          width: "100%",
          margin: "1.5rem 0",
          padding: "12px 0",
          borderRadius: "28px",
        }}
        variant="contained"
        color="primary"
        onClick={navigateHome}
      >
        {status === "loading" ? (
          <CircularProgress size={24} />
        ) : (
          "Create Profile"
        )}
      </Button>
    </Box>
  );
}
