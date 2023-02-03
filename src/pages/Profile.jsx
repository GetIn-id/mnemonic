import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Post from "../components/Post";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router";
// import { getProfile } from "../redux/authSlice";
import { Link as RouteLink } from "react-router-dom";
// import { getFollowers, getFollowings } from "../redux/followSlice";
// import {
//   followAccount,
//   followingAccount,
//   unfollowAccount,
//   unfollowingAccount,
// } from "../api";
import format from "date-fns/format";
import profile from '../assets/grape.png';
import banner from '../assets/lilabanner.png';

export default function Profile() {
  const theme = useTheme();
  const status = "success";
  const [posts, setPosts] = useState([{0: 0, pubkey: "1", created_at: 0, kind: 1, tags: "", content: "dummy content"}]);
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { profile, status } = useSelector((state) => state.auth);
//   const { followingStatus, followerStatus, followers, followings } =
//     useSelector((state) => state.follow);
//   const { _id } = JSON.parse(localStorage.getItem("login"));

//   useEffect(() => {
//     dispatch(getProfile(id));
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (profile.userId) {
//       dispatch(getFollowers(profile.userId._id));
//       dispatch(getFollowings(profile.userId._id));
//     }
//   }, [dispatch, profile.userId]);

//   const handleFollow = async () => {
//     const responseFollow = await followAccount({
//       userId: profile.userId._id,
//       followerId: _id,
//     });
//     const responseFlwing = await followingAccount({
//       followingId: profile.userId._id,
//       userId: _id,
//     });
//     if (responseFollow) {
//       dispatch(getFollowers(id));
//     }
//     if (responseFlwing) {
//       dispatch(getFollowings(id));
//     }
//   };

//   const handleUnfollow = async () => {
//     const responseFollow = await unfollowAccount({
//       id: _id,
//       userId: profile.userId._id,
//     });
//     const responseFlwing = await unfollowingAccount({
//       id: profile.userId._id,
//       userId: _id,
//     });
//     if (responseFollow) {
//       dispatch(getFollowers(id));
//     }
//     if (responseFlwing) {
//       dispatch(getFollowings(id));
//     }
//   };

//   function hideFollow() {
//     if (profile.userId) {
//       return _id === profile.userId._id;
//     }
//   }

//   function isFollowVisible() {
//     if (followers) {
//       const index = followers.findIndex(
//         (follower) => follower.followerId === _id
//       );
//       if (index === -1) return true;
//       return false;
//     }
//   }

  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container alignItems="center">
          <Grid item sx={{ mr: "10px" }}>
            <RouteLink to="/home">
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </RouteLink>
          </Grid>

          {status === "success" && (
            <Grid item>
              <Typography variant="h6">
                {/* {profile.userId && profile.userId && profile.userId.name} */}
                The Grape
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#555" }}>
                {/* {profile.posts && profile.posts.length}  */}
                2 posts
              </Typography>{" "}
            </Grid>
          )}
        </Grid>
      </Box>
      <Box textAlign="center">
        {status === "loading" && (
          <Box marginTop="1rem">
            <CircularProgress size={20} color="primary" />
          </Box>
        )}
      </Box>
      {status === "success" && (
        <Box height="90vh" sx={{ overflowY: "scroll" }}>
          <Box position="relative">
            <img
              width="100%"
              src={banner}
              alt="background"
              style={{maxHeight: "300px"}}
            />
            <Box
              sx={{
                position: "absolute",
                top: 200,
                left: 15,
                background: "#eee",
                borderRadius: "50%",
              }}
            >
              <img width="150px" src={profile} alt="profile" style={{borderRadius: "50%"}} />
            </Box>
          </Box>
          <Box textAlign="right" padding="10px 20px">
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
            <IconButton style={{marginLeft: "10px", marginRight: "10px"}}>
              <MailOutlineIcon />
            </IconButton>
            {/* {!hideFollow() && isFollowVisible() && ( */}
              <Button
                // onClick={handleFollow}
                size="small"
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: "capitalize",
                  padding: "6px 20px",
                  background: "black",
                  "&:hover": {
                    background: "#333",
                  },
                }}
                variant="contained"
              >
                Follow
              </Button>
             {/* )}

            {!hideFollow() && !isFollowVisible() && (
              <Button
                onClick={handleUnfollow}
                size="small"
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: "capitalize",
                  padding: "6px 20px",
                  background: "black",
                  "&:hover": {
                    background: "#333",
                  },
                }}
                variant="contained"
              >
                Unfollow
              </Button>
            )} */}
          </Box>
          <Box padding="10px 20px">
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              {/* {profile.userId && profile.userId.name} */}
            The Grape
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#555" }}>
              {/* @{profile.userId && profile.userId.handle} */}
              @The_Grape
            </Typography>
            <Typography fontSize="16px" color="#333" padding="10px 0">
              {/* {profile.bio} */}
              Just a humble grape who code and stuff
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              padding="6px 0"
              flexWrap="wrap"
            >
              <Box display="flex">
                <LocationOnIcon htmlColor="#555" />
                <Typography sx={{ ml: "6px", color: "#555" }}>
                  {/* {profile.location} */}
                  Sweden
                </Typography>
              </Box>
              <Box display="flex" marginLeft="1rem">
                <InsertLinkIcon htmlColor="#555" />
                <Link
                  sx={{ textDecoration: "none", marginLeft: "6px" }}
                //   href={profile.website || "https:/wasifbaliyan.com"}
                href="https://getin.id"
                >
                  {/* {profile.website ? profile.website : "www"} */}
                  getin.id
                </Link>
              </Box>
              <Box display="flex" marginLeft="1rem">
                <DateRangeIcon htmlColor="#555" />
                <Typography sx={{ ml: "6px", color: "#555" }}>
                  {/* {profile.userId &&
                    profile.userId &&
                    profile.userId.createdAt &&
                    format(new Date(profile.userId.createdAt), "MMM dd yyyy")} */}
                    Jan, 2023
                </Typography>
              </Box>
            </Box>
            <Box display="flex">
              <Typography color="#555" marginRight="1rem">
                <strong style={{ color: "black" }}>
                  {/* {followingStatus === "success" && followings.length} */}
                  100
                </strong>
                -Following
              </Typography>
              <Typography color="#555" marginRight="1rem">
                <strong style={{ color: "black" }}>
                  {/* {followerStatus === "success" && followers.length} */}
                  60
                </strong>
                -Followers
              </Typography>
            </Box>
          </Box>
          <Box borderBottom="1px solid #ccc">
            <Typography
              display="inline-block"
              variant="caption"
              fontSize="16px"
              marginX="1rem"
              padding="6px 0"
              fontWeight="500"
              borderBottom={`4px solid ${theme.palette.primary.main}`}
            >
              Posts
            </Typography>
          </Box>
          {/* {profile.posts &&
            profile.posts.map((post) => (
              <Post key={post._id} post={post} profile={true} />
            ))} */}
            {status === "success" &&
          posts.map((post) => <Post key={Math.floor(Math.random() * 1500)} post={post} />)}
        </Box>
      )}
    </Box>
  );
}