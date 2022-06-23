/* eslint-disable jsx-a11y/anchor-is-valid */
import { Col, Row } from "antd";
import React from "react";
import Util from "../../utils/utils";
import { userName } from "../../utils/constant";
import "./index.less";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: sessionStorage.getItem(userName),
      sysTime: "",
    };

    setInterval(() => {
      const sysTime = Util.formateDate(new Date().getTime());
      this.setState({ sysTime });
    }, 1000);
    // this.getWeatherApiData();
  }

  // getWeatherApiData() {
  //   get(
  //     "https://restapi.amap.com/v3/weather/weatherInfo?key=8c914582f7244d519d8d10f01fe586fa&city=%E8%A5%BF%E5%AE%89%E5%B8%82",
  //     {}
  //   ).then((data) => {
  //     if (data.status == 1) {
  //       const { city, weather } = data.lives[0];
  //       this.setState({
  //         cityWeather: city + " " + weather,
  //       });
  //     }
  //   });
  // }

  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span={24}>
            <span>欢迎， {this.state.userName}</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        <Row className="breadcrump">
          <Col span={4} className="breadcrump-title">
            {/* 首页 */}
          </Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.sysTime}</span>
            <span className="weather-detail">{this.state.cityWeather}</span>
          </Col>
        </Row>
      </div>
    );
  }
}
