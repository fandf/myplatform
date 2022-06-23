import { Row, Col, ConfigProvider } from "antd";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavLeft from "./components/NavLeft";
import React from "react";
import "./style/common.less";
import "moment/locale/zh-cn";
import "moment/dist/locale/zh-cn";
import zhCN from "antd/lib/locale/zh_CN";

class App extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Row className="container">
          <Col span="3" className="nav-left">
            <NavLeft />
          </Col>
          <Col span="20" className="main">
            <Header>Header</Header>
            <Row className="content">
              {this.props.children}
              {/* <Home /> */}
            </Row>
            <Footer />
          </Col>
        </Row>
      </ConfigProvider>
    );
  }
}

export default App;
