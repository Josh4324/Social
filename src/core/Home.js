import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import unicornbikeImg from "../assets/images/unicornbike.jpg";
import Menu from "./Menu";
//import FindPeople from "./../user/FindPeople";
import Newsfeed from "../components/Newsfeed";
import FindPeople from "../components/FindPeople";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.text.secondary,
  },
  media: {
    minHeight: 400,
  },
  credit: {
    padding: 10,
    textAlign: "right",
    backgroundColor: "#ededed",
    borderBottom: "1px solid #d0d0d0",
    "& a": {
      color: "#3f4771",
    },
  },
}));

export default function Home({ history }) {
  const user = useSelector((state) => state.auth.user);
  const { token, id } = user;
  const classes = useStyles();
  const [defaultPage, setDefaultPage] = useState(false);

  /* useEffect(() => {
    setDefaultPage(auth.isAuthenticated());
    const unlisten = history.listen(() => {
      setDefaultPage(auth.isAuthenticated());
    });
    return () => {
      unlisten();
    };
  }, []);
 */
  return (
    <>
      <Menu />
      <div className={classes.root}>
        <div style={{ display: "flex" }}>
          <div style={{ width: "60%" }}>
            <Card className={classes.card}>
              <Typography variant="h6" className={classes.title}>
                Home Page
              </Typography>
              <CardMedia
                className={classes.media}
                image={unicornbikeImg}
                title="Unicorn Bicycle"
              />
              <Typography
                variant="body2"
                component="p"
                className={classes.credit}
                color="textSecondary"
              >
                Photo by{" "}
                <a
                  href="https://unsplash.com/@boudewijn_huysmans"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Boudewijn Huysmans
                </a>{" "}
                on Unsplash
              </Typography>
              <CardContent>
                <Typography type="body1" component="p">
                  Welcome to the MERN Social home page.
                </Typography>
              </CardContent>
            </Card>
            <Newsfeed />
          </div>

          <FindPeople token={token} id={id} />
        </div>
      </div>
    </>
  );
}
