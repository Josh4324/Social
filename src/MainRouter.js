import React, { Component } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Profile from "./components/Profile";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./core/Home";
import PrivateRoute from "./components/PrivateRoute";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PrivateRoute component={Home} />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route
          exact
          path="/user/:id"
          element={<PrivateRoute component={Profile} />}
        />
      </Routes>
      <NotificationContainer />
    </BrowserRouter>
  );
};

export default MainRouter;
