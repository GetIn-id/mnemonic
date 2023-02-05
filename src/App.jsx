import { invoke } from "@tauri-apps/api/tauri";
import { listen, emit } from "@tauri-apps/api/event";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import PostDetails from "./pages/PostDetails";
import Login from "./pages/Login";

function App() {
  const [loadMsg, setLoadMsg] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const reactLoaded = async () => {
      // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
      try {
        setLoadMsg(await invoke("react_loaded", { value: true }));
      } catch {
        console.log("error");
      }
      //console.log(loadMsg);
    };
    reactLoaded();

    // const unlisten = listen("feed-event", (event) => {
    //   console.log(event.payload.content)
    //   setPost(event.payload.content);
    // });

    // return () => {
    //   unlisten.then((f) => f());
    // };
  }, []);

  useEffect(() => {
    const identityExists = async () => {
      try {
        setIsLoggedIn(await invoke("identity_exists"));
      } catch {
        console.log("error loading identity at private route");
      }
    };
    identityExists();
  }, []);
  console.log(isLoggedIn);

  return (
    <Routes>
      <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="posts/:id" element={<Layout><PostDetails /></Layout>} />
      </Route>
      {/* <Route
        path="/"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Layout>
              <Home />
            </Layout>
          </PrivateRoute>
        }
      /> 
      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />
      <Route
        path="/posts/:id"
        element={
          <Layout>
            <PostDetails />
          </Layout>
        }
      /> */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
