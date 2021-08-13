import axios from "axios";
import styles from "./Login.module.css";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import {
  TextField,
  Button,
  Typography,
  Link,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import useForm from "../../hooks/useForm";
import { useStyles } from "./customStyles";

const Login = (props) => {
  const [values, handleChange] = useForm({ email: "", password: "" });
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const userObj = useContext(UserContext);
  const classes = useStyles();
  console.log(user);

  useEffect(() => {
    if (user) {
      userObj.setUser(user);
      props.history.push("/profile");
    }
  }, [user, props.history, userObj]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email: values.email,
          password: values.password,
        }
      );
      setLoading(false);
      setUser(response.data);
    } catch (error) {
      console.log("login error: ", error);
    }
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <section className={styles["login-section"]}>
        <div className={styles["left-section"]}>
          <h1 className={styles["login-header"]}>facebook</h1>
          <p className={styles["login-welcome"]}>
            Facebook helps you connect and share{" "}
            <span>with the people in your life.</span>
          </p>
        </div>
        <div className={styles["right-section"]}>
          <form className={styles["login-form"]} onSubmit={handleLogin}>
            <TextField
              id="outlined-basic"
              label="Email address or phone number"
              variant="outlined"
              className={classes.input}
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              className={classes.input}
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              type="submit"
            >
              Log In
            </Button>
          </form>
          <Typography className={classes.linkTypo}>
            <Link href="#" className={classes.link}>
              Forgotten password?
            </Link>
          </Typography>
          <hr className={styles["divider"]} />
          <Button
            variant="contained"
            size="large"
            className={classes.buttonsec}
          >
            Create New Account
          </Button>
        </div>
      </section>
    </>
  );
};

export default Login;
