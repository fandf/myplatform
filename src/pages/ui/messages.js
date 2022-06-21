import React, { Component } from "react";
import { Button, message, Card } from "antd";
import "../ui.less";

const info = () => {
  message.success("This is a normal message");
};

const success = () => {
  message
    .loading("Action in progress..")
    .then(() => message.success("Loading finished", 2.5))
    .then(() => message.info("Loading finished is finished", 2.5));
};

export default class Messages extends Component {
  render() {
    return (
      <Card title="通知提醒框" className="card-wrap">
        <Button type="primary" onClick={info}>
          Success
        </Button>
        <Button onClick={success}>Display sequential messages</Button>
      </Card>
    );
  }
}
