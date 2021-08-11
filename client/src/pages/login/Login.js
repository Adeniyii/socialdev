import axios from "axios";
import styles from "./Login.module.css";
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../context/UserContext";
import { TextField, Button, Typography, Link } from "@material-ui/core";
import useForm from "../../hooks/useForm";

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

const Login = (props) => {
  const [values, handleChange] = useForm({ email: "", password: "" });
  const userObj = useContext(UserContext);
  const classes = useStyles();

  console.log(userObj.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email: values.email,
          password: values.password,
        }
      );
      userObj.setUser(response.data);
      props.history.push("/profile");
    } catch (error) {
      console.log("login error: ", error);
    }
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
        <Button variant="contained" size="large" className={classes.buttonsec}>
          Create New Account
        </Button>
      </div>
    </section>
  );
};

export default Login;
