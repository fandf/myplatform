import React from "react";
import { Card, Button, Form, Input, Tree, Transfer, Modal } from "antd";
import {
  getRolePage,
  addRole,
  getPermissions,
  getRolePermission,
  updateRolePermission,
  getRoleUserList,
  getUserList,
  roleBindUser,
} from "../../api/api";
import ETable from "../../components/ETable/index";
import Utils from "../../utils/utils";
import { data } from "browserslist";
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
export default class Permission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      menuIds: [],
    };
    this.baseRef = React.createRef();
    this.params = {
      pageNo: 1,
      pageSize: 10,
    };
  }

  componentDidMount() {
    this.requestList();
  }

  requestList = () => {
    let _this = this;
    getRolePage().then((res) => {
      if (res.code === 0) {
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
      }
    });
  };

  // 角色创建
  handleRole = () => {
    this.setState({
      isRoleVisible: true,
    });
  };

  // 角色提交
  handleRoleSubmit = () => {
    this.baseRef.current.getRoleData().then((values) => {
      addRole(values).then((res) => {
        if (res.code === 0) {
          this.setState({
            isRoleVisible: false,
          });
          this.requestList();
        }
      });
    });
  };

  //权限设置
  handlePermission = () => {
    if (!this.state.selectedItem) {
      Modal.info({
        title: "信息",
        content: "请选择一个角色",
      });
      return;
    }
    let _this = this;
    getPermissions().then((res) => {
      if (res.code === 0) {
        //查询角色权限
        getRolePermission(_this.state.selectedItem.id).then((rs) => {
          if (rs.code === 0) {
            const menu = Utils.formatMenu(res.data);
            const menuInfo = Utils.formatMenu(rs.data);
            const menuInfoKeys = [];
            menuInfo.forEach((menu) => {
              let parentKey = menu.key;
              if (menu.children) {
                menu.children.forEach((child) => {
                  menuInfoKeys.push(parentKey + child.key);
                });
              }
            });
            _this.setState({
              isPermVisible: true,
              detailInfo: this.state.selectedItem,
              menu: menu,
              //角色菜单权限
              menuInfo: menuInfoKeys,
            });
          }
        });
      }
    });
  };

  handlePermEditSubmit = () => {
    this.baseRef.current.getPermData().then((values) => {
      data.rold_id = this.state.selectedItem.id;
      data.menus = this.state.menuIds;
      updateRolePermission(data).then((res) => {
        if (res.code === 0) {
          this.setState({
            isPermVisible: false,
          });
        }
        this.requestList();
      });
    });
  };

  // 用户授权
  handleUserAuth = () => {
    if (!this.state.selectedItem) {
      Modal.info({
        title: "信息",
        content: "未选中任何项目",
      });
      return;
    }
    this.roleUserList(this.state.selectedItem.id);
  };
  roleUserList = (id) => {
    getRoleUserList(id).then((res) => {
      if (res.code === 0) {
        getUserList().then((rs) => {
          if (rs.code === 0) {
            this.getAuthUserList(rs.data, res.data);
          }
        });
      }
    });
  };
  // 筛选目标用户
  getAuthUserList = (allUser, roleUser) => {
    const dateSource = [];
    const targetKeys = [];
    if (allUser && allUser.length > 0) {
      const roleUserIds = [];
      if (roleUser && roleUser.length > 0) {
        roleUser.map((user) => roleUserIds.push(user.id));
      }
      for (let i = 0; i < allUser.length; i++) {
        const data = {
          key: allUser[i].id,
          title: allUser[i].username,
          status: roleUserIds.indexOf(allUser[i].id) === -1 ? 0 : 1,
        };
        if (data.status === 1) {
          targetKeys.push(data.key);
        }
        dateSource.push(data);
      }
    }
    this.setState({
      isUserVisible: true,
      isAuthClosed: false,
      detailInfo: this.state.selectedItem,
      dateSource,
      targetKeys,
    });
  };

  patchUserInfo = (targetKeys) => {
    this.setState({
      targetKeys: targetKeys,
    });
  };

  // 用户授权提交
  handleUserSubmit = () => {
    let data = {};
    data.user_ids = this.state.targetKeys || [];
    data.role_id = this.state.selectedItem.id;
    roleBindUser(data).then((res) => {
      if (res.code === 0) {
        this.setState({
          isUserVisible: false,
        });
      }
    });
  };
  render() {
    const columns = [
      {
        title: "角色ID",
        dataIndex: "id",
      },
      {
        title: "角色名称",
        dataIndex: "name",
      },
      {
        title: "角色描述",
        dataIndex: "describe",
      },
      {
        title: "创建时间",
        width: 200,
        dataIndex: "created",
        render: Utils.formatTime,
      },
      {
        title: "创建人",
        dataIndex: "creator",
      },
    ];
    return (
      <div className="card-wrap">
        <Card>
          <Button type="primary" onClick={this.handleRole}>
            创建角色
          </Button>
          <Button type="primary" onClick={this.handlePermission}>
            设置权限
          </Button>
          <Button type="primary" onClick={this.handleUserAuth}>
            用户授权
          </Button>
        </Card>
        <div className="content-wrap">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            dataSource={this.state.list}
            columns={columns}
            selectedItem={this.state.selectedItem}
            pagination={this.state.pagination}
          />
        </div>
        <Modal
          destroyOnClose={true}
          title="创建角色"
          visible={this.state.isRoleVisible}
          onOk={this.handleRoleSubmit}
          onCancel={() => {
            this.baseRef.current.resetRoleData();
            this.setState({
              isRoleVisible: false,
            });
          }}
        >
          <RoleForm ref={this.baseRef} />
        </Modal>
        <Modal
          destroyOnClose={true}
          title="权限设置"
          visible={this.state.isPermVisible}
          width={600}
          onOk={this.handlePermEditSubmit}
          onCancel={() => {
            this.setState({
              isPermVisible: false,
            });
          }}
        >
          <PermEditForm
            ref={this.baseRef}
            detailInfo={this.state.detailInfo}
            menuInfo={this.state.menuInfo || []}
            menu={this.state.menu || []}
            patchMenuInfo={(checkedKeys, info) => {
              this.setState({
                menuInfo: checkedKeys,
              });
              if (info) {
                if (info.checkedNodes) {
                  const menuIds = [];
                  info.checkedNodes.forEach((node) => {
                    menuIds.push(node.dataRef.id);
                  });
                  this.setState({
                    menuIds: menuIds,
                  });
                  console.log("menuIds ====", menuIds);
                } else {
                  this.setState({
                    menuIds: [],
                  });
                }
              } else {
                this.setState({
                  menuIds: [],
                });
              }
            }}
          />
        </Modal>
        <Modal
          destroyOnClose={true}
          title="用户授权"
          visible={this.state.isUserVisible}
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={() => {
            this.setState({
              isUserVisible: false,
            });
          }}
        >
          <RoleAuthForm
            ref={this.baseRef}
            isClosed={this.state.isAuthClosed}
            detailInfo={this.state.detailInfo}
            targetKeys={this.state.targetKeys}
            dateSource={this.state.dateSource}
            patchUserInfo={this.patchUserInfo}
          />
        </Modal>
      </div>
    );
  }
}

// 角色创建
class RoleForm extends React.Component {
  formRef = React.createRef();
  getRoleData = () => {
    const data = this.formRef.current.validateFields().then((values) => {
      return values;
    });
    return data;
  };
  resetRoleData = () => {
    this.formRef.current.resetFields();
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };

    return (
      <Form layout="horizontal" ref={this.formRef}>
        <Form.Item
          label="角色名称"
          {...formItemLayout}
          key="name"
          name="name"
          initialValue=""
        >
          <Input type="text" placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item
          label="角色描述"
          {...formItemLayout}
          key="describe"
          name="describe"
          initialValue=""
        >
          <Input type="text" maxLength={100} placeholder="请输入角色描述" />
        </Form.Item>
      </Form>
    );
  }
}

// 设置权限
class PermEditForm extends React.Component {
  //   formRef = React.createRef();
  //   getPermData = () => {
  //     const data = this.formRef.current.validateFields().then((values) => {
  //       return values;
  //     });
  //     return data;
  //   };
  //   resetPermData = () => {
  //     this.formRef.current.resetFields();
  //   };
  state = {};
  // 设置选中的节点，通过父组件方法再传递回来
  onCheck = (checkedKeys, info) => {
    this.props.patchMenuInfo(checkedKeys, info);
  };
  renderTreeNodes = (data, key = "") => {
    return data.map((item) => {
      let parentKey = key + item.key;
      if (item.children) {
        return (
          <TreeNode
            title={item.label}
            key={parentKey}
            dataRef={item}
            className="op-role-tree"
          >
            {this.renderTreeNodes(item.children, parentKey)}
          </TreeNode>
        );
      } else if (item.btnList) {
        return (
          <TreeNode
            title={item.label}
            key={parentKey}
            dataRef={item}
            className="op-role-tree"
          >
            {this.renderBtnTreedNode(item, parentKey)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={item.label}
          key={parentKey}
          dataRef={item}
          className="op-role-tree"
        />
      );
    });
  };

  renderBtnTreedNode = (menu, parentKey = "") => {
    const btnTreeNode = [];
    menu.btnList.forEach((item) => {
      btnTreeNode.push(
        <TreeNode
          title={item.label}
          key={parentKey + "-btn-" + item.key}
          className="op-role-tree"
        />
      );
    });
    return btnTreeNode;
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };
    const detail_info = this.props.detailInfo;
    const menuInfo = this.props.menuInfo;
    const menu = this.props.menu;
    return (
      <Form layout="horizontal" ref={this.formRef}>
        <Form.Item
          label="角色名称："
          {...formItemLayout}
          key="name"
          name="name"
        >
          <Input disabled maxLength="8" placeholder={detail_info.name} />
        </Form.Item>
        <Tree
          checkable
          defaultExpandAll
          onCheck={(checkedKeys, info) => this.onCheck(checkedKeys, info)}
          checkedKeys={menuInfo || []}
        >
          <TreeNode title="平台权限" key="platform_all">
            {this.renderTreeNodes(menu)}
          </TreeNode>
        </Tree>
      </Form>
    );
  }
}

// 用户授权
class RoleAuthForm extends React.Component {
  //   formRef = React.createRef();
  //   getUserData = () => {
  //     const data = this.formRef.current.validateFields().then((values) => {
  //       return values;
  //     });
  //     return data;
  //   };
  //   resetUserData = () => {
  //     this.formRef.current.resetFields();
  //   };
  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  };
  handleChange = (targetKeys) => {
    this.props.patchUserInfo(targetKeys);
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };
    const detail_info = this.props.detailInfo;
    console.log("detail_info===", detail_info);
    console.log("dateSource===", this.props.dateSource);
    console.log("targetKeys===", this.props.targetKeys);
    return (
      <Form layout="horizontal" ref={this.formRef}>
        <FormItem label="角色名称：" {...formItemLayout}>
          <Input disabled maxLength={8} placeholder={detail_info.name} />
        </FormItem>
        <FormItem label="选择用户：" {...formItemLayout}>
          <Transfer
            listStyle={{ width: 200, height: 400 }}
            dataSource={this.props.dateSource}
            showSearch
            titles={["待选用户", "已选用户"]}
            searchPlaceholder="输入用户名"
            filterOption={this.filterOption}
            targetKeys={this.props.targetKeys}
            onChange={this.handleChange}
            render={(item) => item.title}
          />
        </FormItem>
      </Form>
    );
  }
}
