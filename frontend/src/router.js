import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./pages/login";
import SubmitPage from "./pages/submit";
import UsersPage from "./pages/users";

export default function BuildRouting() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/submit">
          <SubmitPage />
        </Route>
        <Route path="/users">
          <UsersPage />
        </Route>
      </Switch>
    </Router>
  );
}
