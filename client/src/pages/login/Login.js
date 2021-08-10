import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { TextField, Button, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

// Styles for material-ui components
const useStyles = makeStyles((theme) => ({
  button: {
    // padding: "13px",
    textTransform: "none",
    fontSize: "1.2rem",
    fontWeight: "500",
    borderRadius: "8px",
  },
  buttonsec: {
    textTransform: "none",
    fontSize: "1rem",
    fontWeight: "500",
    backgroundColor: "#42b72a",
    color: "#fff",
    borderRadius: "8px",
    marginTop: "20px",
    "&:hover": {
      backgroundColor: "#2f8c1c",
    },
  },
  link: {
    fontSize: "0.9rem",
  },
  linkTypo: {
    margin: "20px 0",
  },
  input: {
    borderRadius: "10px",
  },
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useContext(UserContext);
  const classes = useStyles();

  const handleLogin = async (e) => {
    e.preventDefault();
    // const response = axios.post("http://localhost:8000/api/auth/login", {
    //   email,
    //   password,
    // });
    console.log("submittt");
  };

  return (
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            className={classes.input}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <Button variant="contained" size="large" className={classes.buttonsec}>
          Create New Account
        </Button>
      </div>
    </section>
  );
};

export default Login;
