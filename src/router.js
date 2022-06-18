import React, { Component } from "react";
import { Routes, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import NoMatch from "./pages/nomatch";
import FeedBack from "./pages/feedback";

export default class IRouter extends Component {
  render() {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <App>
              <Routes>
                <Route path="/ui/buttons" element={<FeedBack />} />
                <Route path="/*" element={<NoMatch />} />
              </Routes>
            </App>
          }
        />
      </Routes>
    );
  }
}
