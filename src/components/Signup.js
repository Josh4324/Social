import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import Menu from "../core/Menu";
import { NotificationManager } from "react-notifications";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../features/userSlice";
import { signupCall } from "../utils/apiCalls";

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

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    open: false,
    error: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const submit = async (evt) => {
    setLoading(true);
    const cred = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };

    const result = await signupCall(cred);
    if (result.data.code === 201) {
      setLoading(false);
      let newData = result.data.data;
      NotificationManager.success("Signup successful", "Success");
      localStorage.setItem("social-user", JSON.stringify(newData));
      dispatch(signup(newData));
      navigate("/");
    } else {
      setLoading(false);
      NotificationManager.error("An error occured", "Error");
    }
  };

  return (
    <>
      <Menu />
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" className={classes.title}>
              Sign Up
            </Typography>
            <TextField
              id="name"
              label="FirstName"
              className={classes.textField}
              value={values.name}
              onChange={handleChange("firstName")}
              margin="normal"
            />
            <br />
            <TextField
              id="name"
              label="LastName"
              className={classes.textField}
              value={values.name}
              onChange={handleChange("lastName")}
              margin="normal"
            />
            <br />
            <TextField
              id="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={values.email}
              onChange={handleChange("email")}
              margin="normal"
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
            <br />{" "}
            {loading === true ? (
              <div style={{ marginTop: "10px" }}>
                <span className="loader"></span>
              </div>
            ) : null}
            {values.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}>
                  error
                </Icon>
                {values.error}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              className={classes.submit}
              onClick={submit}
            >
              Submit
            </Button>
          </CardActions>
        </Card>
        <Dialog open={values.open} disableBackdropClick={true}>
          <DialogTitle>New Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              New account successfully created.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/signin">
              <Button color="primary" autoFocus="autoFocus" variant="contained">
                Sign In
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
