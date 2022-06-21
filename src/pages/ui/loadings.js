import React, { Component } from "react";
import { Card, Spin, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "../ui.less";

export default class Loadings extends Component {
  render() {
    const antIcon = (
      <LoadingOutlined
        style={{
          fontSize: 24,
        }}
        spin
      />
    );
    return (
      <div>
        <Card title="Spin用法" className="card-wrap">
          <Spin size="small" />
          <Spin />
          <Spin size="large" />
          <Spin indicator={antIcon} />
        </Card>
        <Card title="内容遮罩">
          <Spin tip="Loading...">
            <Alert
              message="Alert message title"
              description="Further details about the context of this alert."
              type="info"
            />
          </Spin>
          <Spin tip="Loading..." indicator={antIcon}>
            <Alert
              message="Alert message title"
              description="Further details about the context of this alert."
              type="success"
            />
          </Spin>
        </Card>
      </div>
    );
  }
}
