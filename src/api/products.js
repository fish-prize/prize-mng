import qs from 'qs';
import axios from '../utils/myAxios';

export async function list(params) {
  params = params || {};
  params = Object.assign(params, { page: params.page || 1, pageSize: params.pageSize || 15 });

  return axios({
    url: '/mng/products/list',
    method: 'post',
    data: qs.stringify(params),
  });
}

export async function update(params) {
  return axios({
    url: '/mng/products/update',
    method: 'post',
    data: params,
  });
}

export async function del(params) {
  return axios({
    url: '/mng/products/delete',
    method: 'post',
    data: params,
  });
}

export async function prizeProductsSource(params) {
  return axios({
    url: '/mng/products/list',
    method: 'post',
    data: params,
  });
}

