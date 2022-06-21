import axios from "../axios";

//登录
export function loginApi(username, password) {
  return axios("post", "/api/login", { username, password });
}
//个人信息
export function getUseInfo() {
  return axios("get", "/api/user_info", {});
}
//我的菜单
export function getPermissions() {
  return axios("get", "/api/permission/my_permissions", {});
}
//反馈列表
export function getFeedbackPage(data) {
  return axios("get", "/feedback/page", data);
}
