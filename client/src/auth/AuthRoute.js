import React from "react";
import { Route, Redirect } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const AuthRoute = ({ component: Component, ...rest }) => {
  console.log("auth route rendered...");
  const { data, error } = useFetch("/api/users/current");

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <div>
            {error && <Component {...rest} {...props} />}
            {data && (
              <Redirect
                to={{
                  pathname: "/profile",
                  state: {
                    from: props.location,
                  },
                }}
              />
            )}
          </div>
        );
        // if (response.error && response.payload) {
        //   return <Component {...rest} {...props} />;
        // } else if (!response.error && response.payload) {
        //   props.history.push("/profile");
        // }
      }}
    />
  );
};

export default AuthRoute;
