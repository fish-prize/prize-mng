/*
 *
 * userLogout actions
 *
 */

import { push } from 'react-router-redux';
import { Message } from '@alifd/next';
import { logout } from '../../api/user';
import { setAuthority } from '../../utils/authority';
import { reloadAuthorized } from '../../utils/Authorized';
import {
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_FAILURE,
  USER_LOGOUT_SUCCESS,
} from './constants';

const userLogoutRequest = () => {
  return {
    type: USER_LOGOUT_REQUEST,
    isLoading: true,
  };
};

const userLogoutSuccess = (payload) => {
  return {
    type: USER_LOGOUT_FAILURE,
    isLoading: false,
    payload,
  };
};

const userLogoutFailure = (payload) => {
  return {
    type: USER_LOGOUT_SUCCESS,
    isLoading: false,
    payload,
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    dispatch(userLogoutRequest());
    try {
      const response = await logout();

      dispatch(userLogoutSuccess(response.data));
      if (response) {
        Message.success('已登出');
        setAuthority(null);
        reloadAuthorized();
        dispatch(push('/user/login'));
      } else {
        Message.error('请稍后重试');
      }
    } catch (error) {
      dispatch(userLogoutFailure(error));
    }
  };
};
