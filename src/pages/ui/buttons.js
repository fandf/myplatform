import React, { Component } from "react";
import { Button, Card, Radio } from "antd";
import {
  SearchOutlined,
  EditTwoTone,
  PlusCircleTwoTone,
  DeleteTwoTone,
  DownloadOutlined,
  LeftCircleTwoTone,
  RightCircleTwoTone,
} from "@ant-design/icons";
import "./ui.less";

export default class Buttons extends Component {
  state = {
    loading: true,
    size: "default",
  };
  handleCloseLoading = () => {
    this.setState({
      loading: false,
    });
  };
  handleChange = (e) => {
    this.setState({
      size: e.target.value,
    });
  };

  render() {
    return (
      <div className="card-wrap">
        <Card title="基础按钮">
          <Button>Fandf</Button>
          <Button type="primary">Fandf</Button>
          <Button type="dashed">Fandf</Button>
          <Button type="danger">Fandf</Button>
          <Button disabled>Fandf</Button>
        </Card>
        <Card title="图形按钮">
          <Button icon={<PlusCircleTwoTone />}>创建</Button>
          <Button icon={<EditTwoTone />}>编辑</Button>
          <Button icon={<DeleteTwoTone />}>删除</Button>
          <Button shape="circle" icon={<SearchOutlined />}></Button>
          <Button type="primary" icon={<SearchOutlined />}>
            搜索
          </Button>
          <Button type="primary" icon={<DownloadOutlined />}>
            下载
          </Button>
        </Card>

        <Card title="loading按钮">
          <Button type="primary" loading={this.state.loading}>
            确定
          </Button>
          <Button
            type="primary"
            shape="circle"
            loading={this.state.loading}
          ></Button>
          <Button loading={this.state.loading}>点击加载</Button>
          <Button shape="circle" loading={this.state.loading}></Button>
          <Button type="primary" onClick={this.handleCloseLoading}>
            关闭
          </Button>
        </Card>
        <Card title="按钮组">
          <Button.Group>
            <Button type="primary" icon={<LeftCircleTwoTone />}>
              返回
            </Button>
            <Button type="primary" icon={<RightCircleTwoTone />}>
              前进
            </Button>
          </Button.Group>
        </Card>

        <Card title="按钮尺寸">
          <Radio.Group value={this.state.size} onChange={this.handleChange}>
            <Radio value={"small"}>小</Radio>
            <Radio value={"default"}>中</Radio>
            <Radio value={"large"}>大</Radio>
          </Radio.Group>
          <Button size={this.state.size}>Fandf</Button>
          <Button type="primary" size={this.state.size}>
            Fandf
          </Button>
          <Button type="dashed" size={this.state.size}>
            Fandf
          </Button>
          <Button type="danger" size={this.state.size}>
            Fandf
          </Button>
          <Button disabled size={this.state.size}>
            Fandf
          </Button>
        </Card>
      </div>
    );
  }
}
