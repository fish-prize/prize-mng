import Message from '@alifd/next/lib/message';

import {
  SERIES_DATASOURCE_REQUEST,
  SERIES_DATASOURCE_FAILURE,
  SERIES_DATASOURCE_SUCCESS,
} from './constants';

import { seriesSource } from '../../api/series';

const seriesDataSourceRequest = () => {
  return {
    type: SERIES_DATASOURCE_REQUEST,
    isLoading: true,
  };
};

const seriesDataSourceFailure = (payload) => {
  return {
    type: SERIES_DATASOURCE_FAILURE,
    isLoading: true,
    payload,
  };
};

const seriesDataSourceSuccess = (payload) => {
  return {
    type: SERIES_DATASOURCE_SUCCESS,
    isLoading: false,
    payload,
  };
};

export const seriesDataSource = (params) => {
  return async (dispatch) => {
    dispatch(seriesDataSourceRequest);
    try {
      const response = await seriesSource(params);
      if (response && response.data.code === 1) {
        const dataSource = response.data.data;
        console.log('seriesDataSource--->', dataSource);
        dispatch(seriesDataSourceSuccess({ dataSource }));
      } else {
        Message.error('获取专题数据源失败');
      }
    } catch (error) {
      dispatch(seriesDataSourceFailure(error));
    }
  };
};
