import Message from '@alifd/next/lib/message';

import {
  PRIZE_PRODUCTS_DATASOURCE_REQUEST,
  PRIZE_PRODUCTS_DATASOURCE_FAILURE,
  PRIZE_PRODUCTS_DATASOURCE_SUCCESS,
} from './constants';

import { prizeProductsSource } from '../../api/products';

const prizeProductsDataSourceRequest = () => {
  return {
    type: PRIZE_PRODUCTS_DATASOURCE_REQUEST,
    isLoading: true,
  };
};

const prizeProductsDataSourceFailure = (payload) => {
  return {
    type: PRIZE_PRODUCTS_DATASOURCE_FAILURE,
    isLoading: true,
    payload,
  };
};

const prizeProductsDataSourceSuccess = (payload) => {
  return {
    type: PRIZE_PRODUCTS_DATASOURCE_SUCCESS,
    isLoading: false,
    payload,
  };
};

export const prizeProductsDataSource = (params) => {
  return async (dispatch) => {
    dispatch(prizeProductsDataSourceRequest);
    try {
      const response = await prizeProductsSource(params);
      if (response && response.data.code === 1) {
        const dataSource = response.data.data.content.map((item) => {
          return { value: item.id.toString(), label: item.productName };
        });
        console.log('prizeProductsDataSource--->', dataSource);
        dispatch(prizeProductsDataSourceSuccess({ dataSource }));
      } else {
        Message.error('获取抽奖奖品配置数据源失败');
      }
    } catch (error) {
      dispatch(prizeProductsDataSourceFailure(error));
    }
  };
};
