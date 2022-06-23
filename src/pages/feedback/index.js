import React from "react";
import { Card, Table } from "antd";
import { getFeedbackPage } from "./../../api/api";
import Utils from "./../../utils/utils";
import BaseFrom from "../../components/BaseForm";
import "../ui.less";

export default class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isShowOpenCity: false,
    };

    this.params = {
      pageNo: 1,
      pageSize: 10,
    };
    this.formList = [
      {
        type: "INPUT",
        field: "searchTxt",
        label: "用户昵称",
        placeholder: "请输入昵称或地址",
        width: 150,
      },
      {
        type: "时间查询",
        label: "反馈时间",
      },
      {
        type: "SELECT",
        field: "status",
        label: "反馈状态",
        placeholder: "请选择状态",
        width: 120,
        list: [
          { id: "0", name: "待回复" },
          { id: "1", name: "已回复" },
        ],
      },
    ];
  }

  componentDidMount() {
    this.requestList();
  }

  handleFilter = (params) => {
    this.params = params;
    this.requestList();
  };

  // 默认请求我们的接口数据
  requestList = () => {
    let _this = this;
    getFeedbackPage(this.params).then((res) => {
      let list = res.data.records.map((item, index) => {
        item.key = index;
        return item;
      });
      this.setState({
        list: list,
        pagination: Utils.pagination(res, (current) => {
          _this.params.pageNo = current;
          _this.requestList();
        }),
      });
    });
  };

  render() {
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "token",
        dataIndex: "token",
      },
      {
        title: "昵称",
        dataIndex: "userInfo",
        render(userInfo) {
          if (userInfo) {
            return userInfo.userName;
          }
        },
      },
      {
        title: "反馈内容",
        dataIndex: "content",
      },
      {
        title: "状态",
        dataIndex: "status",
        render(status) {
          return status === 1 ? "已回复" : "未回复";
        },
      },

      {
        title: "反馈时间",
        dataIndex: "addTime",
      },
      {
        title: "回复内容",
        dataIndex: "reply",
      },
      {
        title: "回复时间",
        dataIndex: "replyTime",
      },
    ];
    return (
      <div className="card-wrap">
        <Card>
          <BaseFrom formList={this.formList} filterSubmit={this.handleFilter} />
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
      </div>
    );
  }
}
