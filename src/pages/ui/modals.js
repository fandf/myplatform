import React, { Component, useState } from "react";
import { Button, Card, Modal } from "antd";
import "./ui.less";

export default class Modals extends Component {
  state = {
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false,
  };
  handleOpen = (type) => {
    this.setState({ [type]: true });
  };
  handleConfim = (type) => {
    // Modal.confirm === Modal[type]
    Modal[type]({
      title: "确认？",
      content: "你确定你学会React了吗?",
      onOk() {
        console.log("ok");
      },
      onCancel() {
        console.log("cancel");
      },
    });
  };

  render() {
    return (
      <div className="card-wrap">
        <Card title="基础模态框">
          <Button type="primary" onClick={() => this.handleOpen("showModal1")}>
            open
          </Button>
          <Button type="primary" onClick={() => this.handleOpen("showModal2")}>
            自定义页脚
          </Button>
          <Button type="primary" onClick={() => this.handleOpen("showModal3")}>
            顶部20px弹框
          </Button>
          <Button type="primary" onClick={() => this.handleOpen("showModal4")}>
            水平垂直居中
          </Button>
        </Card>

        <Card title="信息确认框" className="card-warp">
          <Button type="primary" onClick={() => this.handleConfim("confirm")}>
            confirm
          </Button>
          <Button type="primary" onClick={() => this.handleConfim("info")}>
            info
          </Button>
          <Button type="primary" onClick={() => this.handleConfim("success")}>
            Success
          </Button>
          <Button type="primary" onClick={() => this.handleConfim("warning")}>
            warning
          </Button>
        </Card>

        <Modal
          title="React"
          visible={this.state.showModal1}
          onOk={() => {}}
          onCancel={() => {
            this.setState({
              showModal1: false,
            });
          }}
        >
          <p>欢迎你点击这个按钮</p>
        </Modal>

        <Modal
          title="React"
          visible={this.state.showModal2}
          onOk={() => {}}
          okText="下一步"
          cancelText="算了"
          onCancel={() => {
            this.setState({
              showModal2: false,
            });
          }}
        >
          <p>欢迎你点击这个按钮</p>
        </Modal>

        <Modal
          title="React"
          style={{ top: 20 }}
          visible={this.state.showModal3}
          onOk={() => {}}
          onCancel={() => {
            this.setState({
              showModal3: false,
            });
          }}
        >
          <p>欢迎你点击这个按钮</p>
        </Modal>

        <Modal
          title="React"
          style={{ top: 20 }}
          visible={this.state.showModal3}
          onOk={() => {}}
          onCancel={() => {
            this.setState({
              showModal3: false,
            });
          }}
        >
          <p>欢迎你点击这个按钮</p>
        </Modal>

        <Modal
          title="React"
          wrapClassName="vertical-center-modal"
          visible={this.state.showModal4}
          onOk={() => {}}
          onCancel={() => {
            this.setState({
              showModal4: false,
            });
          }}
        >
          <p>欢迎你点击这个按钮</p>
        </Modal>
      </div>
    );
  }
}
