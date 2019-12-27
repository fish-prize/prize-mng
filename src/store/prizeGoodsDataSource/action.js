import Message from '@alifd/next/lib/message';

import {
  PRIZE_GOODS_DATASOURCE_REQUEST,
  PRIZE_GOODS_DATASOURCE_FAILURE,
  PRIZE_GOODS_DATASOURCE_SUCCESS,
} from './constants';

import { prizeGoodsSource } from '../../api/goods';

const prizeGoodsDataSourceRequest = () => {
  return {
    type: PRIZE_GOODS_DATASOURCE_REQUEST,
    isLoading: true,
  };
};

const prizeGoodsDataSourceFailure = (payload) => {
  return {
    type: PRIZE_GOODS_DATASOURCE_FAILURE,
    isLoading: true,
    payload,
  };
};

const prizeGoodsDataSourceSuccess = (payload) => {
  return {
    type: PRIZE_GOODS_DATASOURCE_SUCCESS,
    isLoading: false,
    payload,
  };
};

export const prizeGoodsDataSource = (params) => {
  return async (dispatch) => {
    dispatch(prizeGoodsDataSourceRequest);
    try {
      const response = await prizeGoodsSource(params);
      if (response && response.data.code === 1) {
        const dataSource = response.data.data.content.map((item) => {
          return { value: item.id.toString(), label: item.goodsTitle };
        });
        console.log('prizeGoodsDataSource--->', dataSource);
        dispatch(prizeGoodsDataSourceSuccess({ dataSource }));
      } else {
        Message.error('获取抽奖奖品配置数据源失败');
      }
    } catch (error) {
      dispatch(prizeGoodsDataSourceFailure(error));
    }
  };
};
