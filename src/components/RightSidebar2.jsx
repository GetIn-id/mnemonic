import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  FormControl,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import WhoToFollow from "./WhoToFollow";

export default function RightSidebar2() {
  const [query, setQuery] = useState("");
  const [showClearIcon, setShowClearIcon] = useState("none");
  const userStatus = "success";
  const followingStatus = "success";

  const handleChange = (event) => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setQuery(event.target.value);
  };

  const handleClick = () => {
    setQuery("");
  };

  return (
    <Box>
      <FormControl>
        <TextField
          style={{ marginTop: "20px", marginLeft: "10px" }}
          size="normal"
          variant="outlined"
          onChange={handleChange}
          value={query}
          label="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                style={{ display: showClearIcon }}
                onClick={handleClick}
              >
                <Clear />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      {query.length !== 0 && (
        <Box
          width="100%"
          sx={{
            backgroundColor: "white",
            border: "1px solid #eee",
            borderRadius: "28px",
            padding: "1rem 0",
            zIndex: "999",
            maxHeight: "50vh",
            overflowY: "scroll",
          }}
          position="absolute"
        >
          <Typography sx={{ padding: "0 1rem" }}>No users found!</Typography>
        </Box>
      )}
      <Box
          sx={{
            background: "#eee",
            borderRadius: "28px",
            padding: "10px 20px",
            margin: "1rem 0",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Who to follow
          </Typography>
          <Box textAlign="center" marginTop="1rem">
            {(userStatus === "loading" || followingStatus === "loading") && (
              <CircularProgress size={20} color="primary" />
            )}
          </Box>
          <WhoToFollow />
          {/* {userStatus === "success" &&
            showToFollow()
              .slice(0, 7)
              .map((item) => <WhoToFollow key={item._id} user={item} />)} */}
        </Box>
    </Box>
  );
}
