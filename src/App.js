import { Row, Col } from "antd";
import "./App.css";
import "./style/common.less";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavLeft from "./components/NavLeft";
import React from "react";

class App extends React.Component {
  render() {
    return (
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
    );
  }
}

export default App;
