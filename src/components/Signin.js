import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "../core/Menu";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { log } from "../features/userSlice";
import { loginCall } from "../utils/apiCalls";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

export default function Signin(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [values, setValues] = useState({
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const login = async () => {
    setLoading(true);
    const cred = {
      email: values.email,
      password: values.password,
    };

    const result = await loginCall(cred);
    console.log(result.response);
    if (result.data.code === 401) {
      setLoading(false);
      let message = result.data.message;
      return NotificationManager.error(message, "Error");
    }
    if (result.data.code === 200) {
      setLoading(false);
      let newData = result.data.data;
      NotificationManager.success("Signin successful", "Success");
      localStorage.setItem("social-user", JSON.stringify(newData));
      dispatch(log(newData));
      navigate("/");
    } else {
      setLoading(false);
      NotificationManager.error("An error occurred", "Error");
    }
  };

  return (
    <>
      <Menu />
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign In
          </Typography>
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
            required
          />
          <br />
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
          />

          <br />
          {loading === true ? (
            <div style={{ marginTop: "10px" }}>
              <span className="loader"></span>
            </div>
          ) : null}

          {
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}></Icon>
            </Typography>
          }
        </CardContent>

        <CardActions>
          <Button
            color="primary"
            variant="contained"
            className={classes.submit}
            onClick={login}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
