import Message from '@alifd/next/lib/message';

import {
  OUTLINE_DATASOURCE_REQUEST,
  OUTLINE_DATASOURCE_FAILURE,
  OUTLINE_DATASOURCE_SUCCESS,
} from './constants';

import { outlineSource } from '../../api/outline';

const outlineDataSourceRequest = () => {
  return {
    type: OUTLINE_DATASOURCE_REQUEST,
    isLoading: true,
  };
};

const outlineDataSourceFailure = (payload) => {
  return {
    type: OUTLINE_DATASOURCE_FAILURE,
    isLoading: true,
    payload,
  };
};

const outlineDataSourceSuccess = (payload) => {
  return {
    type: OUTLINE_DATASOURCE_SUCCESS,
    isLoading: false,
    payload,
  };
};

export const outlineDataSource = (params) => {
  return async (dispatch) => {
    dispatch(outlineDataSourceRequest);
    try {
      const response = await outlineSource(params);
      if (response && response.data.code === 1) {
        const dataSource = response.data.data;
        console.log('outlineDataSource--->', dataSource);
        dispatch(outlineDataSourceSuccess({ dataSource }));
      } else {
        Message.error('获取专题数据源失败');
      }
    } catch (error) {
      dispatch(outlineDataSourceFailure(error));
    }
  };
};
