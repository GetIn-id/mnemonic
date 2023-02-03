import { Grid, IconButton, Typography, Box } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import profileImage from "../assets/grape.png";

export default function Comment({ comment }) {
  return (
    <Box
      padding="1rem"
      sx={{
        "&:hover": {
          backgroundColor: "#eee",
        },
      }}
    >
      <Grid container flexWrap="nowrap">
        <Grid item sx={{ paddingRight: "1rem" }}>
          <img
            src={profileImage}
            alt="avatar"
            width="50px"
            style={{ borderRadius: "50%" }}
          />
        </Grid>
        <Grid item flexGrow="1">
          <Box>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              flexWrap="nowrap"
            >
              <Grid item>
                <Box display="flex">
                  <Typography
                    sx={{ fontSize: "16px", fontWeight: 500, mr: "6px" }}
                  >
                    {/* {comment.author.name} */}
                    The Grape
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    {/* @{comment.author.handle} */}
                    @The_Grape
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    .
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    {/* {formatDistanceToNow(new Date(comment.createdAt))}{" "} */}
                    2 hours ago{" "}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "15px", color: "#555" }}>
                    {/* {comment.text} */}
                    This is the comment text
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <IconButton>
                  <MoreHorizIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
