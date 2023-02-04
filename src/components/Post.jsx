import {
  Grid,
  IconButton,
  Input,
  Typography,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
//import { Box } from "@mui/system";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import fromUnixTime from "date-fns/fromUnixTime";
import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SyncIcon from "@mui/icons-material/Sync";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Link } from "react-router-dom";
//import { addComment, deletePost, likeOrDislikePost } from "../api";
//import { useDispatch } from "react-redux";
//import { getPosts, updateLike } from "../redux/postSlice";
import Modal from "./Modal";
//import { getProfile } from "../redux/authSlice";
import profileImage from "../assets/grape.png";
import logo from "../assets/logo_lila_logo.png";

export default function Post({ post, profile }) {
  const [commentText, setCommentText] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const jsonEvent = JSON.parse(post.content);
  return (
    <>
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
            {/* <Link to={`/profile/${post.author._id}`}> */}
            <Link to={`/profile`}>
              <img
                src={profileImage}
                alt="logo"
                width="50px"
                style={{ borderRadius: "50%" }}
              />
            </Link>
          </Grid>
          <Grid item flexGrow="1">
            <Box>
              <Link
                to={`/post`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
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
                        The Grape
                      </Typography>
                      <Typography
                        sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                      >
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
                        {formatDistanceToNow(fromUnixTime(jsonEvent[2]))}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "15px", color: "#555" }}>
                        {jsonEvent[5]}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item>
                    <IconButton
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(e);
                      }}
                    >
                      <MoreHorizIcon />
                    </IconButton>

                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      onClick={(e) => e.stopPropagation()}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem>Delete Post</MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Link>
              <Box
                display="flex"
                justifyContent="space-between"
                marginRight="5rem"
                marginTop=".8rem"
              >
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    handleModalOpen();
                  }}
                  size="small"
                >
                  <ChatBubbleOutlineIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <SyncIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <FavoriteBorderIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <IosShareIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {openModal && (
        <Modal
          open={openModal}
          handleClose={handleModalClose}
          saveText={"Comment"}
          len={commentText.trimStart().length}
        >
          <Box>
            <Grid container>
              <Grid item>
                <img
                  src={profileImage}
                  alt="logo"
                  width="60px"
                  style={{ borderRadius: "50%" }}
                />
              </Grid>
              <Grid item flexGrow="1">
                <Box padding=".5rem 0">
                  <Input
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                    multiline
                    rows="2"
                    disableUnderline
                    type="text"
                    placeholder="Post your comment"
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
    </>
  );
}
