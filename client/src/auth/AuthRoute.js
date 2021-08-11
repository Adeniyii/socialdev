import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const AuthRoute = ({ component: Component, ...rest }) => {
  const userObj = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!userObj.user) {
          return <Component {...rest} {...props} />;
        } else {
          props.history.push("/");
        }
      }}
    />
  );
};

export default AuthRoute;
