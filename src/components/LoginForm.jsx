import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
//import { loginUser } from "../redux/authSlice";

export default function LoginForm() {
  const [loginData, setLoginData] = useState("");
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  //const { status, isLoggedIn } = useSelector((state) => state.auth);
  const status = "success";
  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch(loginUser(loginData));
    navigate("/home");
  };

  //   const loginAsGuest = () => {
  //     setLoginData({ email: "tomato@mail.com", password: "tomato" });
  //     dispatch(loginUser({ email: "tomato@mail.com", password: "tomato" }));
  //   };

  //   useEffect(() => {
  //     if (isLoggedIn) {
  //       history.push("/");
  //     }
  //   }, [isLoggedIn, history]);
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        onChange={(e) => setLoginData(e.target.value)}
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Enter private key"
        type="text"
        required
        name="privateKey"
        autoCapitalize="false"
      />
      {/* <TextField
          sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
          variant="outlined"
          label="Enter Password"
          type="password"
          required
          onChange={(e) =>
            setLoginData((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          name="password"
        /> */}
      <Button
        disabled={loginData.length === 0}
        sx={{
          width: "100%",
          margin: "1.5rem 0",
          padding: "12px 0",
          borderRadius: "28px",
        }}
        variant="contained"
        color="primary"
        type="submit"
      >
        {status === "loading" ? (
          <CircularProgress size={24} sx={{ color: "#FFF" }} />
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
}
