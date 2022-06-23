import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import NoMatch from "./pages/nomatch";
import Login from "./pages/login";
import FeedBack from "./pages/feedback";
import Buttons from "./pages/ui/buttons";
import Modals from "./pages/ui/modals";
import Loadings from "./pages/ui/loadings";
import Notice from "./pages/ui/notice";
import Messages from "./pages/ui/messages";
import Tabs from "./pages/ui/tabs";
import Gallery from "./pages/ui/gallery";
import Carousels from "./pages/ui/carousels";
import Home from "./pages/home";
import Appversion from "./pages/appversion";
import Bar from "./pages/echarts/bar";
import Line from "./pages/echarts/line";
import Pie from "./pages/echarts/pie";
import Rich from "./pages/rich";
import Permission from "./pages/permission";
import User from "./pages/user";

export default class IRouter extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <App>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/feedback/page" element={<FeedBack />} />
                <Route path="/appversion/page" element={<Appversion />} />

                <Route path="/charts/bar" element={<Bar />} />
                <Route path="/charts/line" element={<Line />} />
                <Route path="/charts/pie" element={<Pie />} />
                <Route path="/charts/rich" element={<Rich />} />

                <Route path="/permission/permission" element={<Permission />} />
                <Route path="/permission/user" element={<User />} />

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
