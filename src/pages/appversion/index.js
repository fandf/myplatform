import React, { Component } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  Radio,
  Select,
  message,
  DatePicker,
} from "antd";
import BaseForm from "../../components/BaseForm";
import ETable from "../../components/ETable";
import {
  getAppversionPage,
  addAppversion,
  updateAppversion,
  deleteAppversion,
} from "./../../api/api";
import Utils from "./../../utils/utils";
import moment from "moment";
import {
  EditTwoTone,
  PlusCircleTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import "../ui.less";

export default class Appversion extends Component {
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
    this.versionForm = React.createRef();
    this.formList = [
      {
        type: "INPUT",
        field: "appVersion",
        label: "版本号",
        placeholder: "请输入版本号",
        width: 100,
      },
      {
        type: "时间查询",
        label: "发布时间",
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
        title: "新增版本",
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
        title: "编辑版本",
        versionInfo: item,
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
          deleteAppversion(item.id).then((res) => {
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
    this.versionForm.current.resetFormData();
  };

  handleSubmit = () => {
    const type = this.state.type;
    if (type === "create") {
      this.versionForm.current.getFormData().then((values) => {
        values.effectTime = values.effectTime.format("YYYY-MM-DD HH:mm:ss");
        addAppversion(values).then((res) => {
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
      this.versionForm.current.getFormData().then((values) => {
        values.id = this.state.selectedItem.id;
        values.effectTime = values.effectTime.format("YYYY-MM-DD HH:mm:ss");
        updateAppversion(values).then((res) => {
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
            this.resetForm();
            this.requestList();
          }
        });
      });
    }
  };
  // 默认请求我们的接口数据
  requestList = () => {
    let _this = this;
    getAppversionPage(this.params).then((res) => {
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
        title: "版本名称",
        dataIndex: "appName",
        width: 200,
      },
      {
        title: "版本号",
        dataIndex: "appVersion",
        width: 100,
      },
      {
        title: "version_code",
        dataIndex: "versionCode",
        width: 100,
      },
      {
        title: "设备名称",
        width: 100,
        dataIndex: "dc",
        render(dc) {
          return dc === "a" ? "安卓" : "苹果";
        },
      },
      {
        title: "下载地址",
        dataIndex: "downloadUrl",
        width: 50,
      },
      {
        title: "升级描述",
        dataIndex: "describe",
      },
      {
        title: "是否生效",
        dataIndex: "effect",
        width: 100,
        render(effect) {
          return effect === 1 ? "生效" : "不生效";
        },
      },
      {
        title: "生效时间",
        dataIndex: "effectTime",
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
          {/* <Button type="primary" onClick={() => this.handleOperator("detail")}>
            详情
          </Button> */}
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
            versionInfo={this.state.versionInfo}
            ref={this.versionForm}
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
    const type = this.props.type;
    let versionInfo = this.props.versionInfo || {};
    console.log("versionInfo==", versionInfo);
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <Form ref={this.formRef}>
        <Form.Item
          label="版本名称"
          {...formItemLayout}
          key="appName"
          name="appName"
          initialValue={versionInfo.appName}
        >
          <Input type="text" placeholder="请输入版本名称" />
        </Form.Item>
        <Form.Item
          label="版本号"
          {...formItemLayout}
          key="appVersion"
          name="appVersion"
          initialValue={versionInfo.appVersion}
        >
          <Input type="text" placeholder="请输入版本号" />
        </Form.Item>
        <Form.Item
          label="version_code"
          {...formItemLayout}
          key="versionCode"
          name="versionCode"
          initialValue={versionInfo.versionCode}
        >
          <Input type="number" placeholder="请输入code" />
        </Form.Item>
        <Form.Item
          label="下载地址"
          {...formItemLayout}
          key="downloadUrl"
          name="downloadUrl"
          initialValue={versionInfo.downloadUrl}
        >
          <Input type="text" placeholder="请输入下载地址" />
        </Form.Item>
        <Form.Item
          label="升级描述"
          {...formItemLayout}
          key="describe"
          name="describe"
          initialValue={versionInfo.describe}
        >
          <Input.TextArea
            showCount
            maxLength={500}
            placeholder="请描述升级提示"
          />
        </Form.Item>
        <Form.Item
          label="设备"
          {...formItemLayout}
          key="dc"
          name="dc"
          initialValue={versionInfo.dc}
        >
          <Select width="10px">
            <Select.Option value="a">安卓</Select.Option>
            <Select.Option value="i">苹果</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="是否生效"
          {...formItemLayout}
          key="effect"
          name="effect"
          initialValue={versionInfo.effect}
        >
          <Radio.Group>
            <Radio value={0}>否</Radio>
            <Radio value={1}>是</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="生效时间"
          {...formItemLayout}
          key="effectTime"
          name="effectTime"
          initialValue={moment(versionInfo.effectTime)}
        >
          <DatePicker showTime />
        </Form.Item>
      </Form>
    );
  }
}
