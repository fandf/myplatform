import React, { Component } from "react";
import { Carousel, Card } from "antd";
import "../ui.less";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default class Carousels extends Component {
  render() {
    return (
      <div className="card-wrap">
        <Card title="图片背景轮播">
          <Carousel autoplay>
            <div>
              <h3 style={contentStyle} effect="fade">
                java
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>js</h3>
            </div>
            <div>
              <h3 style={contentStyle}>ts</h3>
            </div>
            <div>
              <h3 style={contentStyle}>react</h3>
            </div>
          </Carousel>
        </Card>

        <Card title="图片轮播">
          <Carousel autoplay>
            <div>
              <img src="/carousel-img/carousel-1.jpg" alt="" />
            </div>
            <div>
              <img src="/carousel-img/carousel-2.jpg" alt="" />
            </div>
            <div>
              <img src="/carousel-img/carousel-3.jpg" alt="" />
            </div>
          </Carousel>
        </Card>
      </div>
    );
  }
}
