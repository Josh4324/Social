import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import DeleteUser from "./DeleteUser";
import { Link } from "react-router-dom";
import FollowProfileButton from "../components/FollowProfileButton";
import ProfileTabs from "../components/ProfileTabs";
import { useSelector, useDispatch } from "react-redux";
import Menu from "../core/Menu";
import { getUserData } from "../utils/apiCalls";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(2)}px ${theme.spacing(1)}px 0`,
    color: theme.palette.protectedTitle,
    fontSize: "1em",
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10,
  },
}));

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const token = user.token;
  const userId = user.id;
  const classes = useStyles();
  const [profile, setProfile] = useState({});
  const [follow, setFollow] = useState(false);
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
  });
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    (async () => {
      const result = await getUserData(signal, token, id);
      setProfile(result.data.data.data);
      console.log(result);
      setFollow(result.data.data.followStatus);
    })();

    return function cleanup() {
      abortController.abort();
    };
  }, [id]);

  const removePost = (post) => {
    const updatedPosts = posts;
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  const photoUrl = values.user._id
    ? `/api/users/photo/${values.user._id}?${new Date().getTime()}`
    : "/api/users/defaultphoto";

  return (
    <>
      <Menu />
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={photoUrl} className={classes.bigAvatar} />
            </ListItemAvatar>
            <ListItemText
              primary={profile.firstName}
              secondary={profile.email}
            />{" "}
            <ListItemSecondaryAction>
              <Link to={"/user/edit/"}>
                <IconButton aria-label="Edit" color="primary">
                  <Edit />
                </IconButton>
              </Link>
              <DeleteUser userId={values.user._id} />
            </ListItemSecondaryAction>
            {profile._id === user.id ? null : (
              <FollowProfileButton
                id={id}
                token={token}
                userId={userId}
                follow={follow}
                following={values.following}
              />
            )}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={values.user.about}
              secondary={
                "Joined: " + new Date(profile.dateCreated).toDateString()
              }
            />
          </ListItem>
        </List>
        <ProfileTabs
          user={values.user}
          posts={posts}
          removePostUpdate={removePost}
        />
      </Paper>
    </>
  );
}
