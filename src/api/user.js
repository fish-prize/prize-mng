import qs from 'qs';
import axios from '../utils/myAxios';

/**
 * 通过 JavaScript 的形式模拟静态接口
 * 这样做的目的是可以直接打包出来部署在线上而不依赖后端或者 mock 接口
 */
export async function getUserProfile() {
  return axios({
    url: '/mng/user/getUserInfo',
    method: 'post',
  });
}

export async function login(params) {
  return axios({
    url: '/mng/user/login',
    method: 'post',
    data: qs.stringify(params),
  });
}

export async function logout() {
  return axios({
    url: '/mng/user/logout',
    method: 'post',
  });
}

export async function postUserRegister() {
  const data = await {
    status: 200,
    statusText: 'ok',
    currentAuthority: 'user',
  };
  return { data };
}

