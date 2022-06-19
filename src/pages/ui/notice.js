import React, { Component } from "react";
import { Button, notification, Card } from "antd";
import "./ui.less";

const openNotificationWithIcon = (type) => {
  notification[type]({
    placement: "bottomLeft",
    message: "Notification Title",
    description: "This is the content of the notification.",
  });
};

export default class Notice extends Component {
  render() {
    return (
      <Card title="通知提醒框" className="card-wrap">
        <Button onClick={() => openNotificationWithIcon("success")}>
          Success
        </Button>
        <Button onClick={() => openNotificationWithIcon("info")}>Info</Button>
        <Button onClick={() => openNotificationWithIcon("warning")}>
          Warning
        </Button>
        <Button onClick={() => openNotificationWithIcon("error")}>Error</Button>
      </Card>
    );
  }
}
