import Message from '@alifd/next/lib/message';

import {
  SUBJECT_DATASOURCE_REQUEST,
  SUBJECT_DATASOURCE_FAILURE,
  SUBJECT_DATASOURCE_SUCCESS,
} from './constants';

import { listSubject } from '../../api/subject';

const subjectDataSourceRequest = () => {
  return {
    type: SUBJECT_DATASOURCE_REQUEST,
    isLoading: true,
  };
};

const subjectDataSourceFailure = (payload) => {
  return {
    type: SUBJECT_DATASOURCE_FAILURE,
    isLoading: true,
    payload,
  };
};

const subjectDataSourceSuccess = (payload) => {
  return {
    type: SUBJECT_DATASOURCE_SUCCESS,
    isLoading: false,
    payload,
  };
};

export const subjectDataSource = (params) => {
  return async (dispatch) => {
    dispatch(subjectDataSourceRequest);
    try {
      const response = await listSubject(params);
      if (response && response.data.code === 1) {
        const dataSource = response.data.data.content.map((item) => {
          return { value: item.id.toString(), label: item.subjectName };
        });
        // console.log('--->1', dataSource);
        dispatch(subjectDataSourceSuccess({ dataSource }));
      } else {
        Message.error('获取专题数据源失败');
      }
    } catch (error) {
      dispatch(subjectDataSourceFailure(error));
    }
  };
};
