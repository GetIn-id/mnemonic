import React, { useState } from "react";
import { Typography, Box, TextField, FormControl } from "@mui/material";
import WhoToFollow from "./WhoToFollow";
import Jack from "../assets/jack.jpeg";
import The_Grape from "../assets/grape.png";
import Skarsh from "../assets/skarsh.png";

export default function RightSidebar() {
  const [query, setQuery] = useState("");
  const [followUsers, setFollowUsers] = useState([
    {
      id: 1,
      name: "Jack",
      handler: "Jack",
      avatar: Jack,
    },
    {
      id: 2,
      name: "The Grape",
      handler: "The_Grape",
      avatar: The_Grape,
    },
    {
      id: 3,
      name: "Skarsh",
      handler: "Skarsh",
      avatar: Skarsh,
    },
  ]);
  const userStatus = "success";
  const followingStatus = "success";

  //const { _id } = JSON.parse(localStorage.getItem("login"));
  //const dispatch = useDispatch();
  //const { users, userStatus } = useSelector((state) => state.auth);
  //const { followingStatus, followings } = useSelector((state) => state.follow);
  //   function queriedUsers() {
  //     return users.filter(
  //       (user) =>
  //         user.name.toLowerCase().includes(query.toLowerCase()) ||
  //         user.handle.toLowerCase().includes(query.toLowerCase())
  //     );
  //   }

  //   useEffect(() => {
  //     dispatch(getFollowings(_id));
  //   }, [dispatch, _id]);

  //   function showToFollow() {
  //     const filtered = users.filter((user) => user._id !== _id);

  //     return filtered.filter((item) => {
  //       const index = followings.findIndex(
  //         (follow) => follow.followingId === item._id
  //       );
  //       if (index !== -1) {
  //         return false;
  //       }
  //       return true;
  //     });
  //   }

  return (
    <Box>
      <FormControl>
        <TextField
          style={{ marginTop: "20px", marginLeft: "0px", width: "370px" }}
          size="normal"
          variant="outlined"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          label="Search profiles, notes, etc.."
        />
      </FormControl>
      {query.length !== 0 && (
        <Box
          width="380px"
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
          {/* {query.length !== 0 && queriedUsers().length === 0 && ( */}
          <Typography sx={{ padding: "0 1rem" }}>No users found!</Typography>
          {/* )}
              {queriedUsers().map((user) => (
                <Box key={user._id}>
                  <Link
                    onClick={() => setQuery("")}
                    style={{ textDecoration: "none" }}
                    to={`/profile/${user._id}`}
                  >
                    <Grid
                      sx={{
                        overflow: "hidden",
                        padding: ".2rem 1rem",
                        "&:hover": {
                          backgroundColor: "#eee",
                        },
                      }}
                      container
                      alignItems="center"
                    >
                      <Grid item sx={{ paddingRight: "12px" }}>
                        <img src="/logo.png" width="50px" alt="logo" />
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center">
                          <Grid item>
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: "500",
                                color: "#000",
                              }}
                            >
                              {user.name}
                            </Typography>
                            <Box display="flex" alignItems="center">
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  mr: "6px",
                                  color: "#555",
                                }}
                              >
                                {user.handle}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Link>
                </Box>
              ))} */}
        </Box>
      )}
      <Box
        sx={{
          background: "#eee",
          borderRadius: "28px",
          padding: "10px 20px",
          margin: "1rem 0",
          width: "100%",
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
        {/* <WhoToFollow  /> */}
        {/* {userStatus === "success" &&
            showToFollow()
              .slice(0, 7)
              .map((item) => <WhoToFollow key={item._id} user={item} />)} */}
        {userStatus === "success" &&
          followUsers.map((item) => <WhoToFollow key={item.id} user={item} />)}
      </Box>
    </Box>
  );
}
