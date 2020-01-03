import axios from 'axios';
import { Message } from '@alifd/next';
// import { MemoryRouter } from 'react-router';

// const baseUrl = 'http://localhost:8081/';
const baseUrl = 'http://prize.ichenxing.cn/';
axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 100000;


// // axios拦截器
axios.interceptors.request.use(config => {
  config.validateStatus = (status) => {
    if (status >= 200 && status <= 300) {
      return true;
    } else if (status === 401) {
      // MemoryRouter.push('/user')
      Message.error('无权限');
      return false;
    } else if (status === 502) {
      Message.error('网关错误');
      return false;
    }
    Message.error('系统异常');
    return false;
  };
  return config;
});

axios.interceptors.response.use(response => {
  // 在这里你可以判断后台返回数据携带的请求码
  console.log('response->1', response);
  if (response.status === 200 && response.data.code === 1) {
    console.log('response->2', response, { data: response.data.data });
    return { data: response.data };
  } else if (response.status === 200 && response.data.code !== 1) {
    console.log('response->3', response);
    Message.error(response.data.msg);
    return { data: response.data };
  }
});
export {
  axios as default,
  baseUrl,
};
