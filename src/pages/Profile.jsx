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
import { invoke } from "@tauri-apps/api/tauri";
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
  const [posts, setPosts] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [follow, setFollow] = useState(false);
  

  useEffect(() => {
    const loadProfileFeed = async () => {
      try {
        const content = await invoke("load_home_feed", { value: true });
        setPosts(content.posts);
        setStatus("success")
      } catch (err) {
        console.log("error - couldnt load profile feed", {err});
      }
    };

    loadProfileFeed();
  }, []);

  useEffect(() => {
    const loadMetaData = async () => {
      try {
        const content = await invoke("load_metadata", { value: true });
        setMetaData(content);
        
      } catch {
        console.log("error - couldnt load meta data");
      }
    };
    loadMetaData();
  }, []);
  const handleFollow = () => {
    setFollow(!follow);
  };
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
      <Box borderBottom="1px solid #ccc" padding="3vh 20px">
        <Grid container alignItems="center">
          <Grid item sx={{ mr: "15px" }}>
            <RouteLink to="/">
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </RouteLink>
          </Grid>

          {status === "success" && (
            <Grid item>
              <Typography variant="h6">
                {/* {profile.userId && profile.userId && profile.userId.name} */}
                {metaData.name && metaData.name}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#555" }}>
                {posts && posts.length} {" "} posts
                
              </Typography>
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
        <Box height="86vh" sx={{ overflowY: "scroll" }}>
          <Box position="relative">
            <img
              width="100%"
              src={metaData.banner}
              alt="background"
              style={{maxHeight: "250px"}}
            />
            <Box
              sx={{
                position: "absolute",
                top: 150,
                left: 15,
                background: "#eee",
                borderRadius: "50%",
              }}
            >
              <img width="125px" src={metaData.picture} alt="profile" style={{borderRadius: "50%"}} />
            </Box>
          </Box>
          <Box textAlign="right" padding="10px 20px">
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
            <IconButton style={{marginLeft: "10px", marginRight: "10px"}}>
              <MailOutlineIcon />
            </IconButton>
            {!follow && (
              <Button
                onClick={handleFollow}
                size="small"
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: "capitalize",
                  padding: "6px 20px",
                  background: "primary",
                }}
                variant="contained"
              >
                Follow
              </Button>
            )}

            {follow && (
              <Button
                onClick={handleFollow}
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
            )} 
          </Box>
          <Box padding="10px 20px">
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              {/* {profile.userId && profile.userId.name} */}
            {metaData.name && metaData.name}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#555" }}>
              {/* @{profile.userId && profile.userId.handle} */}
              @{metaData.display_name && metaData.display_name}
            </Typography>
            <Typography fontSize="16px" color="#333" padding="10px 0">
              {/* {profile.bio} */}
              {metaData.about && metaData.about}
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
                href={metaData.website && metaData.website}
                >
                  {/* {profile.website ? profile.website : "www"} */}
                  {metaData.website && metaData.website}
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
                {" "}Following
              </Typography>
              <Typography color="#555" marginRight="1rem">
                <strong style={{ color: "black" }}>
                  {/* {followerStatus === "success" && followers.length} */}
                  60
                </strong>
                {" "}Followers
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
            {status === "success" &&
          posts.map((post) => <Post key={Math.floor(Math.random() * 10000)} post={post} />)}
        </Box>
      )}
    </Box>
  );
}