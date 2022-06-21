import React, { Component } from "react";
import "./index.less";
import { getUseInfo } from "../../api/api";
import { userName } from "../../utils/constant";

export default class Home extends Component {
  render() {
    return <div className="home-wrap">欢迎进入Bwitter后台管理系统</div>;
  }
}
