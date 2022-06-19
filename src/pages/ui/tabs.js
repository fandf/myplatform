import React, { Component } from "react";
import { Tabs, Card, message } from "antd";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import "./ui.less";

const { TabPane } = Tabs;
const onChange = (key) => {
  message.success("你选择了" + key);
};
export default class tabs extends Component {
  render() {
    return (
      <div className="card-wrap">
        <Card title="tab页签">
          <Tabs defaultActiveKey="1" onChange={onChange}>
            <TabPane
              tab={
                <span>
                  <AndroidOutlined />
                  Tab 2
                </span>
              }
              key="1"
            >
              欢迎学习react
            </TabPane>
            <TabPane
              tab={
                <span>
                  <AppleOutlined />
                  Tab 1
                </span>
              }
              key="2"
            >
              欢迎学习java
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              欢迎学习go
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}
