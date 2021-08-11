import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { theme } from "./context/themeContext";
import { ThemeProvider } from "@material-ui/core";
import { UserProvider } from "./context/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
