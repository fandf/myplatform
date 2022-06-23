/**
 * 网络请求配置
 */
import axios from "axios";
import { message, Spin } from "antd";
import { tokenKey } from "../utils/constant";
import ReactDOM from "react-dom";

axios.defaults.timeout = 100000;

// 当前正在请求的数量
let requestCount = 0;

// 显示loading
function showLoading() {
  if (requestCount === 0) {
    var dom = document.createElement("div");
    dom.setAttribute("id", "loading");
    document.body.appendChild(dom);
    ReactDOM.render(<Spin tip="加载中..." size="large" />, dom);
  }
  requestCount++;
}
// 隐藏loading
function hideLoading() {
  requestCount--;
  if (requestCount === 0) {
    document.body.removeChild(document.getElementById("loading"));
  }
}
/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Content-Type": "application/json;charset=UTF-8",
    };
    if (sessionStorage.getItem(tokenKey)) {
      config.headers[tokenKey] = sessionStorage.getItem(tokenKey);
    }
    // requestCount为0，才创建loading, 避免重复创建
    if (config.headers.isLoading !== false) {
      showLoading();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  (res) => {
    // 判断当前请求是否设置了不显示Loading
    if (res.config.headers.isLoading !== false) {
      hideLoading();
    }
    if (res.data.code === -1) {
      message.error(res.data.message);
    }
    if (res.data.code === -2) {
      // window.location.href("#");
    }
    return res;
  },
  (err) => {
    if (err.message === "Network Error") {
      message.warning("网络连接异常！");
    }
    if (err.code === "ECONNABORTED") {
      message.warning("请求超时，请重试");
    }
    return Promise.reject(err);
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        landing(url, params, response);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装del方法
 * @param url  请求url
 * @param data
 * @returns {Promise}
 */
export function del(url, data) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data).then(
      (response) => {
        //关闭进度条
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        //关闭进度条
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

/**
 * 统一接口处理，返回数据
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default function (fecth, url, param) {
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case "get":
        get(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request GET failed.", error);
            reject(error);
          });
        break;
      case "post":
        post(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request POST failed.", error);
            reject(error);
          });
        break;
      case "put":
        put(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request PUT failed.", error);
            reject(error);
          });
        break;
      case "delete":
        del(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request DELETE failed.", error);
            reject(error);
          });
        break;
      default:
        break;
    }
  });
}

//失败提示
function msag(err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        alert(err.response.data.error.details);
        break;
      case 401:
        alert("未授权，请登录");
        break;

      case 403:
        alert("拒绝访问");
        break;

      case 404:
        alert("请求地址出错");
        break;

      case 408:
        alert("请求超时");
        break;

      case 500:
        alert("服务器内部错误");
        break;

      case 501:
        alert("服务未实现");
        break;

      case 502:
        alert("网关错误");
        break;

      case 503:
        alert("服务不可用");
        break;

      case 504:
        alert("网关超时");
        break;

      case 505:
        alert("HTTP版本不受支持");
        break;
      default:
    }
  }
}

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing(url, params, data) {
  switch (data.code) {
    case -1:
      alert(data.message);
      break;
    case -2:
      alert("已过期，请重新登录");
      break;
    default:
  }
}
