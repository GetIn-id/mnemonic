import { invoke } from "@tauri-apps/api/tauri";
import { listen, emit } from "@tauri-apps/api/event";

//import Login from "./pages/Login";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
// import PostDetails from "./pages/PostDetails";
// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PostDetails from "./pages/PostDetails";
// import axios from "axios";
// import { setAuth } from "./redux/authSlice";

function App() {
  const [loadMsg, setLoadMsg] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const reactLoaded = async () => {
      // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
      try {
      setLoadMsg(await invoke("react_loaded", { value: true }));
      } catch {
        console.log("error");
      }
      console.log(loadMsg);
    };
    reactLoaded();
  }, []);
  // const dispatch = useDispatch();
  // const { isLoggedIn } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if ("login" in localStorage) {
  //     const login = JSON.parse(localStorage.getItem("login"));
  //     axios.defaults.headers.common["authorization"] = `Bearer ${login.token}`;
  //   }
  // }, [isLoggedIn]);

  // useEffect(() => {
  //   const { isLoggedIn } = JSON.parse(localStorage.getItem("login")) || {};
  //   if (isLoggedIn) {
  //     dispatch(setAuth({ isLoggedIn }));
  //   }
  // }, [dispatch, isLoggedIn]);

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
    <Layout>
      <Routes>
        {/* <PrivateRoute exact path="/profile/:id"> */}
        {/* <PrivateRoute exact path="/profile">
        <Layout>
          <Profile />
        </Layout>
      </PrivateRoute> */}
        {/* <PrivateRoute exact path="/posts/:id">
        <Layout>
          <PostDetails />
        </Layout>
      </PrivateRoute> */}
        {/* <PrivateRoute exact path="/">
        <Layout>
          <Home />
        </Layout>
      </PrivateRoute> */}
        {/* <Route path="/login">
        <Login />
      </Route> */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post" element={<PostDetails />} />
      </Routes>
    </Layout>
  );
}

export default App;
