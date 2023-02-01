import { invoke } from "@tauri-apps/api/tauri";
import { listen, emit } from "@tauri-apps/api/event";
import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AssistantIcon from "@mui/icons-material/Assistant";
import Post from "./components/Post";
//import AddPost from "../components/AddPost";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [speed, setFeed] = useState("");

  const [posts, setPosts] = useState([{name: "post1"}, {name: "post2"}]);
  const status = "success";

  useEffect(() => {
    const unlisten = listen("feed-event", (event) => {
      console.log(event.payload.post)
      setFeed(event.payload.post);
      // const content = JSON.parse(event.payload.post);
      // setPosts(content);
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);


  // function sendEvent() {
  //   emit("hello-from-frontend", {
  //     theMessage: "Tauri is awesome!",
  //   });
  // }

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

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
        {status === "success" &&
          posts.map((post) => <Post key={1} post={post} />)}
      </Box>
    </Box>
  );
}

export default App;