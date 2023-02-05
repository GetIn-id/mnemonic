import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import AssistantIcon from "@mui/icons-material/Assistant";
import Post from "../components/Post";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/tauri";
//import { useDispatch, useSelector } from "react-redux";
//import { getPosts } from "../redux/postSlice";

export default function Home() {
  const [posts, setPosts] = useState("");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const loadHomeFeed = async () => {
      try {
        const content = await invoke("load_home_feed", { value: true });
        setPosts(content.posts);
        setStatus("success")
      } catch {
        console.log("error - couldnt load home feed");
      }
    };
    loadHomeFeed();
  }, []);


  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="3vh 20px">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">Home</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box height="87vh" sx={{ overflowY: "scroll" }}>
        <Box textAlign="center" marginTop="1rem">
          {status === "loading" && (
            <CircularProgress size={20} color="primary" />
          )}
        </Box>
        {status === "success" &&
          posts.map((post) => <Post key={Math.floor(Math.random() * 10000)} post={post} />)}
      </Box>
    </Box>
  );
}
