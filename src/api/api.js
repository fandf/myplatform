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
  return axios("get", "/api/feedback/page", data);
}
//app版本列表
export function getAppversionPage(data) {
  return axios("get", "/api/appversion", data);
}
export function addAppversion(data) {
  return axios("post", "/api/appversion", data);
}
export function updateAppversion(data) {
  return axios("put", "/api/appversion", data);
}
export function deleteAppversion(data) {
  return axios("delete", "/api/appversion/" + data, data);
}

//角色列表
export function getRolePage(data) {
  return axios("get", "/api/role/list", data);
}
export function addRole(data) {
  return axios("post", "/api/role", data);
}
//角色菜单
export function getRolePermission(data) {
  return axios("get", "/api/permission/role_permission/" + data, {});
}
export function updateRolePermission(data) {
  return axios("post", "/api/permission/menu/sync/" + data.rold_id, {
    permissionIds: data.menus,
  });
}
export function getRoleUserList(data) {
  return axios("get", "/api/role/role/user?id=" + data, {});
}
export function getUserList() {
  return axios("get", "/api/user/list", {});
}
//用户绑定角色
export function roleBindUser(data) {
  return axios("post", "/api/role/role/user", {
    roleId: data.role_id,
    userIds: data.user_ids,
  });
}

//用户列表
export function getPlatformUserPage(data) {
  return axios("get", "/api/platform_user/page", data);
}
export function addPlatformUser(data) {
  return axios("post", "/api/platform_user", data);
}
export function updatePlatformUser(data) {
  return axios("put", "/api/platform_user", data);
}
export function deletePlatformUser(data) {
  return axios("delete", "/api/platform_user/" + data);
}
//修改用户状态
export function updatePlatformUserStatus(data) {
  return axios("put", "/api/platform_user/" + data);
}
