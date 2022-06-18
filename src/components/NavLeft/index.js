import React from "react";
import menuConfig from "../../config/menuConfig";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.less";

export const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

class NavLeft extends React.Component {
  componentDidMount() {
    this.setState({
      menuConfig: menuConfig,
    });
  }

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt="" />
          <h1>Imooc MS</h1>
        </div>
        <Menu
          theme="dark"
          items={menuConfig}
          onClick={({ item, key, keyPath, domEvent }) => {
            console.log(" key : ", key);
            this.props.navigate(key);
          }}
        />
      </div>
    );
  }
}
export default withNavigation(NavLeft);
