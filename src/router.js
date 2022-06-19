import React, { Component } from "react";
import { Routes, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import NoMatch from "./pages/nomatch";
import FeedBack from "./pages/feedback";
import Buttons from "./pages/ui/buttons";
import Modals from "./pages/ui/modals";
import Loadings from "./pages/ui/loadings";
import Notice from "./pages/ui/notice";
import Messages from "./pages/ui/messages";
import Tabs from "./pages/ui/tabs";
import Gallery from "./pages/ui/gallery";
import Carousels from "./pages/ui/carousels";

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
                <Route path="/ui/buttons" element={<Buttons />} />
                <Route path="/ui/modals" element={<Modals />} />
                <Route path="/ui/loadings" element={<Loadings />} />
                <Route path="/ui/notification" element={<Notice />} />
                <Route path="/ui/messages" element={<Messages />} />
                <Route path="/ui/tabs" element={<Tabs />} />
                <Route path="/ui/gallery" element={<Gallery />} />
                <Route path="/ui/carousel" element={<Carousels />} />
                <Route path="/*" element={<NoMatch />} />
              </Routes>
            </App>
          }
        />
      </Routes>
    );
  }
}
