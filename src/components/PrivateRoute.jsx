import React from "react";
//import { useSelector } from "react-redux";
import { Navigate, Route, Outlet } from "react-router-dom";


export default function PrivateRoute({ path, children, isLoggedIn }) {

  if (isLoggedIn) {
    return children ? children : <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}