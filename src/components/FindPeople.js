import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import ViewIcon from "@material-ui/icons/Visibility";
import { NotificationManager } from "react-notifications";

import {
  acceptRequest,
  getFriends,
  getFriendsRequest,
  getPotentialFriends,
  sendRequest,
} from "../utils/apiCalls";

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(1),
  },
  follow: {
    right: theme.spacing(2),
  },
  snack: {
    color: theme.palette.protectedTitle,
  },
  viewButton: {
    verticalAlign: "middle",
  },
}));

export default function FindPeople(props) {
  const { token, id } = props;
  const classes = useStyles();
  const [values, setValues] = useState({
    users: [],
    open: false,
    followMessage: "",
  });
  const [users, setUsers] = useState([]);
  const [pfriends, setPfriends] = useState([]);
  const [friends, setFriends] = useState([]);

  const sendFriendRequest = async (friendID) => {
    const cred = {
      userID: id,
      friendID,
      status: "pending",
    };

    const result = await sendRequest(cred, token);
    if (result) {
      console.log(result);
      NotificationManager.success("Friend Request Sent", "Success");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const acceptFriendRequest = async (friendID) => {
    const cred = {
      status: "accepted",
    };

    const result = await acceptRequest(friendID, cred, token);
    if (result) {
      console.log(result);
      NotificationManager.success("Friend Request Accepted", "Success");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const rejectFriendRequest = async (friendID) => {
    const cred = {
      status: "rejected",
    };

    const result = await acceptRequest(friendID, cred, token);
    if (result) {
      console.log(result);
      NotificationManager.success("Friend Request Rejected", "Success");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    (async () => {
      const result = await getPotentialFriends(signal, token);
      const result2 = await getFriendsRequest(signal, token);
      const result3 = await getFriends(token);
      setUsers(result.data.data);
      setPfriends(result2.data.data);
      setFriends(result3.data.data);
    })();

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const handleRequestClose = (event, reason) => {
    setValues({ ...values, open: false });
  };
  return (
    <div style={{ width: "40%", marginTop: "40px" }}>
      {friends.length > 0 ? (
        <Paper className={classes.root} elevation={4}>
          <p style={{ paddingTop: "20px", paddingLeft: "20px", margin: "0px" }}>
            Friends List
          </p>
          <List>
            {friends.map((item, i) => {
              return (
                <span key={i}>
                  <ListItem>
                    <ListItemAvatar className={classes.avatar}>
                      <Avatar src={"/api/users/photo/" + item._id} />
                    </ListItemAvatar>
                    <ListItemText primary={item.firstName} />
                    <ListItemSecondaryAction className={classes.follow}>
                      <Link to={"/user/" + item._id}>
                        <IconButton
                          variant="contained"
                          color="secondary"
                          className={classes.viewButton}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Link>
                      <Button
                        aria-label="Follow"
                        variant="contained"
                        color="primary"
                      >
                        Chat
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </span>
              );
            })}
          </List>
        </Paper>
      ) : null}
      {users.length > 0 ? (
        <Paper
          className={classes.root}
          style={{ marginTop: "30px" }}
          elevation={4}
        >
          <p style={{ paddingTop: "20px", paddingLeft: "20px", margin: "0px" }}>
            People you may know
          </p>
          <List>
            {users.map((item, i) => {
              return (
                <span key={i}>
                  <ListItem>
                    <ListItemAvatar className={classes.avatar}>
                      <Avatar src={"/api/users/photo/" + item._id} />
                    </ListItemAvatar>
                    <ListItemText primary={item.firstName} />
                    <ListItemSecondaryAction className={classes.follow}>
                      <Link to={"/user/" + item._id}>
                        <IconButton
                          variant="contained"
                          color="secondary"
                          className={classes.viewButton}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Link>
                      <Button
                        onClick={() => sendFriendRequest(item._id)}
                        aria-label="Follow"
                        variant="contained"
                        color="primary"
                      >
                        Add Friend
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </span>
              );
            })}
          </List>
        </Paper>
      ) : null}

      {pfriends.length > 0 ? (
        <Paper className={classes.root} elevation={4}>
          <p
            style={{
              paddingTop: "20px",
              paddingLeft: "20px",
              marginTop: "30px",
            }}
          >
            Friends Request
          </p>
          <List>
            {pfriends.map((item, i) => {
              return (
                <span key={i}>
                  <ListItem>
                    <ListItemAvatar className={classes.avatar}>
                      <Avatar src={"/api/users/photo/" + item._id} />
                    </ListItemAvatar>
                    <ListItemText primary={item.firstName} />
                    <ListItemSecondaryAction className={classes.follow}>
                      <Button
                        onClick={() => acceptFriendRequest(item._id)}
                        aria-label="Follow"
                        variant="contained"
                        color="primary"
                        style={{ marginRight: "5px" }}
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => rejectFriendRequest(item._id)}
                        aria-label="Follow"
                        variant="contained"
                        color="primary"
                      >
                        Reject
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </span>
              );
            })}
          </List>
        </Paper>
      ) : null}

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={values.open}
        onClose={handleRequestClose}
        autoHideDuration={6000}
        message={<span className={classes.snack}>{values.followMessage}</span>}
      />
    </div>
  );
}
