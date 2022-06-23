import React, { Component } from "react";
import { Input, Select, Form, Button, Checkbox, DatePicker } from "antd";
import Utils from "../../utils/utils";
import local from "antd/es/date-picker/locale/zh_CN";

const FormItem = Form.Item;

export default class BaseFrom extends Component {
  formRef = React.createRef();

  handleFilterSubmit = () => {
    this.formRef.current.validateFields().then((values) => {
      this.props.filterSubmit(values);
    });
  };

  reset = () => {
    this.formRef.current.resetFields();
  };

  initFormList = () => {
    const formList = this.props.formList;
    const formItemList = [];

    if (formList && formList.length > 0) {
      formList.forEach((item, i) => {
        let label = item.label;
        let field = item.field;
        let initValue = item.initialValue || "";
        let placeholder = item.placeholder || "";
        let width = item.width;
        if (item.type === "INPUT") {
          const INPUT = (
            <FormItem
              label={label}
              key={field}
              name={field}
              initialValue={initValue}
            >
              <Input key={field} type="text" placeholder={placeholder} />
            </FormItem>
          );
          formItemList.push(INPUT);
        } else if (item.type === "SELECT") {
          const SELECT = (
            <FormItem label={label} key={field} name={field}>
              <Select
                key={field}
                style={{ width: width }}
                placeholder={placeholder}
              >
                {Utils.getOptionList(item.list)}
              </Select>
            </FormItem>
          );
          formItemList.push(SELECT);
        } else if (item.type === "CHECKBOX") {
          const CHECKBOX = (
            <FormItem
              label={label}
              key={field}
              name={field}
              initialValue={initValue} //true || false
              valuePropName="checked"
            >
              <Checkbox key={field}>{label}</Checkbox>
            </FormItem>
          );
          formItemList.push(CHECKBOX);
        } else if (item.type === "时间查询") {
          //   const begin_time = (
          //     <FormItem label={label} key={field} name="begin_time">
          //       <DatePicker
          //         showTime={true}
          //         placeholder={placeholder}
          //         format="YYYY-MM-DD h:mm:ss"
          //       ></DatePicker>
          //     </FormItem>
          //   );
          //   const end_time = (
          //     <FormItem label="~" colon={false} key={field} name="end_time">
          //       <DatePicker
          //         showTime={true}
          //         placeholder={placeholder}
          //         format="YYYY-MM-DD h:mm:ss"
          //       ></DatePicker>
          //     </FormItem>
          //   );
          //   formItemList.push(begin_time);
          //   formItemList.push(end_time);
          const time = (
            <FormItem label={label} key={field} name="date_time">
              <DatePicker.RangePicker
                key={field}
                showTime={{
                  format: "HH:mm:ss",
                }}
                format="YYYY-MM-DD HH:mm:ss"
                locale={local}
              />
            </FormItem>
          );
          formItemList.push(time);
        }
      });
    }
    return formItemList;
  };

  render() {
    return (
      <Form layout="inline" ref={this.formRef}>
        {this.initFormList()}

        <FormItem>
          <Button
            key="search"
            type="primary"
            style={{ margin: "0 20px" }}
            onClick={this.handleFilterSubmit}
          >
            查询
          </Button>
          <Button key="reset" type="primary" onClick={this.reset}>
            重置
          </Button>
        </FormItem>
      </Form>
    );
  }
}
