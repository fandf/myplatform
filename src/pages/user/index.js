import React, { Component } from "react";
import { Card, Button, Modal, Form, Input, message } from "antd";
import BaseForm from "../../components/BaseForm";
import ETable from "../../components/ETable";
import {
  getPlatformUserPage,
  addPlatformUser,
  updatePlatformUser,
  deletePlatformUser,
  updatePlatformUserStatus,
} from "./../../api/api";
import Utils from "./../../utils/utils";
import {
  EditTwoTone,
  PlusCircleTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import "../ui.less";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isShowOpenCity: false,
      isVisible: false,
    };

    this.params = {
      pageNo: 1,
      pageSize: 10,
    };
    this.baseRef = React.createRef();
    this.formList = [
      {
        type: "INPUT",
        field: "searchTxt",
        label: "账户",
        placeholder: "请输入账户名",
        width: 200,
      },
    ];
  }

  componentDidMount() {
    this.requestList();
  }

  handleOperator = (type) => {
    let item = this.state.selectedItem;
    if (type === "create") {
      this.setState({
        type,
        isVisible: true,
        title: "新增",
      });
    } else if (type === "edit") {
      if (!item) {
        Modal.info({
          title: "提示",
          content: "请选择一条数据",
        });
        return;
      }
      this.setState({
        type,
        isVisible: true,
        title: "编辑",
        userInfo: item,
      });
    } else if (type === "delete") {
      if (!item) {
        Modal.info({
          title: "提示",
          content: "请选择一条数据",
        });
        return;
      }
      let _this = this;
      Modal.confirm({
        title: "确认删除",
        onOk() {
          deletePlatformUser(item.id).then((res) => {
            if (res.code === 0) {
              _this.setState({
                isVisible: false,
              });
              _this.requestList();
            }
          });
        },
      });
    } else if (type === "status") {
      if (!item) {
        Modal.info({
          title: "提示",
          content: "请选择一条数据",
        });
        return;
      }
      let _this = this;
      Modal.confirm({
        title: item.status === 0 ? "确认启用？" : "确认注销？",
        onOk() {
          updatePlatformUserStatus(item.id).then((res) => {
            if (res.code === 0) {
              _this.setState({
                isVisible: false,
              });
              _this.requestList();
            }
          });
        },
      });
    }
  };

  handleFilter = (params) => {
    this.params = params;
    this.requestList();
  };

  resetForm = () => {
    this.baseRef.current.resetFormData();
  };

  handleSubmit = () => {
    const type = this.state.type;
    if (type === "create") {
      this.baseRef.current.getFormData().then((values) => {
        addPlatformUser(values).then((res) => {
          if (res.code === 0) {
            message.success({
              content: "新增成功",
              className: "custom-class",
              style: {
                marginTop: "20vh",
              },
            });
            this.setState({
              isVisible: false,
            });
            this.resetForm();
            this.requestList();
          }
        });
      });
    } else if (type === "edit") {
      this.baseRef.current.getFormData().then((values) => {
        values.id = this.state.selectedItem.id;
        updatePlatformUser(values).then((res) => {
          if (res.code === 0) {
            message.success({
              content: "修改成功",
              className: "custom-class",
              style: {
                marginTop: "20vh",
              },
            });
            this.setState({
              isVisible: false,
            });
            // this.resetForm();
            this.requestList();
          }
        });
      });
    }
  };
  // 默认请求我们的接口数据
  requestList = () => {
    let _this = this;
    getPlatformUserPage(this.params).then((res) => {
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
        title: "id",
        dataIndex: "id",
        width: 50,
      },
      {
        title: "登录账号",
        dataIndex: "username",
        width: 200,
      },
      {
        title: "姓名",
        dataIndex: "name",
        width: 100,
      },
      {
        title: "联系电话",
        dataIndex: "tel",
        width: 100,
      },
      {
        title: "邮箱",
        width: 100,
        dataIndex: "email",
      },
      {
        title: "状态",
        dataIndex: "status",
        width: 100,
        render(status) {
          return status === 0 ? "注销" : "启用";
        },
      },
      {
        title: "创建时间",
        dataIndex: "created",
        width: 150,
      },
    ];

    return (
      <div className="card-wrap">
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button
            type="primary"
            icon={<PlusCircleTwoTone />}
            onClick={() => this.handleOperator("create")}
          >
            新增
          </Button>
          <Button
            type="primary"
            icon={<EditTwoTone />}
            onClick={() => this.handleOperator("edit")}
          >
            编辑
          </Button>
          <Button
            type="primary"
            icon={<DeleteTwoTone />}
            onClick={() => this.handleOperator("status")}
          >
            启用/注销
          </Button>
          <Button
            type="primary"
            icon={<DeleteTwoTone />}
            onClick={() => this.handleOperator("delete")}
          >
            删除
          </Button>
        </Card>
        <ETable
          updateSelectedItem={Utils.updateSelectedItem.bind(this)}
          columns={columns}
          dataSource={this.state.list}
          selectedRowKeys={this.state.selectedRowKeys}
          selectedItem={this.state.selectedItem}
          pagination={this.state.pagination}
        />
        <Modal
          destroyOnClose={true}
          visible={this.state.isVisible}
          title={this.state.title}
          onOk={this.handleSubmit}
          onCancel={() => {
            this.setState({ isVisible: false, versionInfo: {} });
            console.log("onCancel");
            this.resetForm();
          }}
          width={600}
        >
          <AppversionForm
            type={this.state.type}
            userInfo={this.state.userInfo}
            ref={this.baseRef}
          />
        </Modal>
      </div>
    );
  }
}
class AppversionForm extends React.Component {
  formRef = React.createRef();
  getFormData = () => {
    const data = this.formRef.current.validateFields().then((values) => {
      return values;
    });
    return data;
  };
  resetFormData = () => {
    this.formRef.current.resetFields();
  };

  render() {
    let type = this.props.type;
    let userInfo = this.props.userInfo || {};
    if (type === "create") {
      userInfo = {};
    }
    console.log("versionInfo==", userInfo);
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <Form ref={this.formRef}>
        <Form.Item
          label="账号"
          {...formItemLayout}
          key="username"
          name="username"
          initialValue={userInfo.username}
          required
        >
          <Input
            type="text"
            placeholder="请输入账号"
            required
            disabled={type === "edit"}
          />
        </Form.Item>
        <Form.Item
          label="姓名"
          {...formItemLayout}
          key="name"
          name="name"
          initialValue={userInfo.name}
          required
        >
          <Input type="text" placeholder="请输入姓名" required />
        </Form.Item>
        <Form.Item
          label="联系电话"
          {...formItemLayout}
          key="tel"
          name="tel"
          initialValue={userInfo.tel}
        >
          <Input type="number" placeholder="请输入联系电话" />
        </Form.Item>
        <Form.Item
          label="邮箱"
          {...formItemLayout}
          key="email"
          name="email"
          initialValue={userInfo.email}
        >
          <Input type="email" placeholder="请输入邮箱地址" />
        </Form.Item>
      </Form>
    );
  }
}
