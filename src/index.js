import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import Router from "./router";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Router />
  </HashRouter>
);
registerServiceWorker();
