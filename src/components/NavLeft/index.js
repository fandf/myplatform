import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.less";
import { getPermissions } from "../../api/api";
import Utils from "../../utils/utils";

export const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

class NavLeft extends React.Component {
  state = {
    menuConfig: "",
    current: "1",
  };

  componentDidMount() {
    getPermissions().then((res) => {
      if (res.code === 0) {
        const menu = Utils.formatMenu(res.data);
        let current = window.location.hash.replace(/#|\?.*$/g, "");
        this.setState({
          menuConfig: menu,
          current,
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
