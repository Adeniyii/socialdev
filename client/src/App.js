import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
// import Navbar from "./components/Navbar";
import React from "react";
import Profile from "./pages/profile/Profile";
import ProtectedRoute from "./auth/ProtectedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoute from "./auth/AuthRoute";

function App() {
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <AuthRoute path="/login" component={Login} />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route path="*" render={() => "404 Not Found"} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
