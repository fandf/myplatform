import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.less";
import { getPermissions } from "../../api/api";

export const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const formatMent = (items) => {
  const res = [];
  items.forEach((item) => {
    const MenuItem = [];
    if (item.children) {
      item.children.forEach((children) => {
        MenuItem.push(getItem(children.name, children.uri));
      });
    }
    res.push(getItem(item.name, item.uri, null, MenuItem));
  });
  return res;
};

class NavLeft extends React.Component {
  state = {
    menuConfig: "",
    current: "1",
  };

  componentDidMount() {
    getPermissions().then((res) => {
      if (res.code === 0) {
        const menu = formatMent(res.data);
        console.log("menu =====", menu);
        this.setState({
          menuConfig: menu,
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt="" />
          <h1>Bwitter</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={this.state.menuConfig}
          selectedKeys={this.state.current}
          onClick={({ item, key, keyPath, domEvent }) => {
            console.log(" key : ", key);
            this.setState({
              current: key,
            });
            this.props.navigate(key);
          }}
        />
      </div>
    );
  }
}
export default withNavigation(NavLeft);
