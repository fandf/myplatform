import { Col, Row } from "antd";
import React from "react";
import "./index.less";
import Util from "../../utils/utils";
import Axios from "../../axios";
import { Router } from "react-router-dom";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = { userName: "越走越远了、", sysTime: "", cityWeather: "西安" };

    setInterval(() => {
      const sysTime = Util.formateDate(new Date().getTime());
      this.setState({ sysTime });
    }, 1000);
    this.getWeatherApiData();
  }

  getWeatherApiData() {
    const res = Axios.jsonp({
      url: "https://restapi.amap.com/v3/weather/weatherInfo?key=8c914582f7244d519d8d10f01fe586fa&city=%E8%A5%BF%E5%AE%89%E5%B8%82",
    }).then((res) => {
      if (res.status == 1) {
        const { city, weather } = res.lives[0];
        console.log(city, weather);
        this.setState({
          cityWeather: city + " " + weather,
        });
      }
    });
  }

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
            首页
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
