import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import jwt_decode from "jwt-decode";

function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  if (user !== null) {
    const decoded = jwt_decode(user?.token);
    console.log(decoded);
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("social-user");
      dispatch(logout(null));
      navigate("/signin");
    }
  }

  return <>{user ? <Component /> : <Navigate to="/signin" replace />}</>;
}

export default PrivateRoute;
