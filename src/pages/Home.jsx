import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import AssistantIcon from "@mui/icons-material/Assistant";
import Post from "../components/Post";
import { listen } from "@tauri-apps/api/event";
//import { useDispatch, useSelector } from "react-redux";
//import { getPosts } from "../redux/postSlice";
//import AddPost from "../components/AddPost";

export default function Home() {
  const [posts, setPosts] = useState([
    {
      0: 0,
      pubkey: "",
      created_at: 0,
      kind: 1,
      tags: "",
      content: "dummy content",
    },
  ]);
  const status = "success";

  // const dispatch = useDispatch();
  //   const { status, posts } = useSelector((state) => state.post);
  //   useEffect(() => {
  //     dispatch(getPosts());
  //   }, [dispatch]);

  useEffect(() => {
    const unlisten = listen("feed-event", (event) => {
      //console.log(event.payload.post);
      const jsonEvent = JSON.parse(event.payload.post);
      const ZERO = 0;
      const PUBKEY = 1;
      const CREATED_AT = 2;
      const KIND = 3;
      const TAGS = 4;
      const CONTENT = 5;
      setPosts([
        {
          0: jsonEvent[ZERO],
          pubkey: jsonEvent[PUBKEY],
          created_at: jsonEvent[CREATED_AT],
          kind: jsonEvent[KIND],
          tags: jsonEvent[TAGS],
          content: jsonEvent[CONTENT],
        },
      ]);
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);
  console.log(posts);
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
