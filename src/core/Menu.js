import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../features/userSlice";

const Menu = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("social-user");
    dispatch(logout(null));
    navigate("/signin");
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Link style={{ textDecoration: "none" }} to="/">
              <Typography variant="h6" color="inherit">
                Social
              </Typography>
            </Link>
          </div>

          <div>
            {user === null ? (
              <span>
                <Link style={{ textDecoration: "none" }} to="/signup">
                  <Button>Sign up</Button>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/signin">
                  <Button>Sign In</Button>
                </Link>
              </span>
            ) : null}

            {user ? (
              <span>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/user/${user.id}`}
                >
                  <Button>{user.name}</Button>
                </Link>
                <Button onClick={signOut} color="inherit">
                  Sign out
                </Button>
              </span>
            ) : null}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
