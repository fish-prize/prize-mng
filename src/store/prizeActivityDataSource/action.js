import Message from '@alifd/next/lib/message';

import {
  PRIZE_ACTIVITY_DATASOURCE_REQUEST,
  PRIZE_ACTIVITY_DATASOURCE_FAILURE,
  PRIZE_ACTIVITY_DATASOURCE_SUCCESS,
} from './constants';

import { prizeActivitySource } from '../../api/activity';

const prizeActivityDataSourceRequest = () => {
  return {
    type: PRIZE_ACTIVITY_DATASOURCE_REQUEST,
    isLoading: true,
  };
};

const prizeActivityDataSourceFailure = (payload) => {
  return {
    type: PRIZE_ACTIVITY_DATASOURCE_FAILURE,
    isLoading: true,
    payload,
  };
};

const prizeActivityDataSourceSuccess = (payload) => {
  return {
    type: PRIZE_ACTIVITY_DATASOURCE_SUCCESS,
    isLoading: false,
    payload,
  };
};

export const prizeActivityDataSource = (params) => {
  return async (dispatch) => {
    dispatch(prizeActivityDataSourceRequest);
    try {
      const response = await prizeActivitySource(params);
      if (response && response.data.code === 1) {
        const dataSource = response.data.data.content.map((item) => {
          return { value: item.id.toString(), label: item.prizeTitle };
        });
        console.log('prizeActivityDataSource--->', dataSource);
        dispatch(prizeActivityDataSourceSuccess({ dataSource }));
      } else {
        Message.error('获取抽奖活动数据源失败');
      }
    } catch (error) {
      dispatch(prizeActivityDataSourceFailure(error));
    }
  };
};
