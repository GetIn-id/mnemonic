import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import AssistantIcon from "@mui/icons-material/Assistant";
import Post from "../components/Post";
//import { useDispatch, useSelector } from "react-redux";
//import { getPosts } from "../redux/postSlice";
//import AddPost from "../components/AddPost";

export default function Home() {
    const [posts, setPosts] = useState([{key: 1, name: "post1"}, {key: 2, name: "post2"}]);
    const status = "success";
// const dispatch = useDispatch();
//   const { status, posts } = useSelector((state) => state.post);
//   useEffect(() => {
//     dispatch(getPosts());
//   }, [dispatch]);

  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">Home</Typography>
          </Grid>
          <Grid item>
            <IconButton>
              <AssistantIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box height="92vh" sx={{ overflowY: "scroll" }}>
        {/* <AddPost /> */}
        <Box textAlign="center" marginTop="1rem">
          {status === "loading" && (
            <CircularProgress size={20} color="primary" />
          )}
        </Box>
        {/* {status === "success" &&
          posts.map((post) => <Post key={post._id} post={post} />)} */}
          {status === "success" &&
          posts.map((post) => <Post key={post.key} post={post} />)}
      </Box>
    </Box>
  );
}