/*
 * Login Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { push } from 'react-router-redux';
import { Message } from '@alifd/next';
import { login, getUserProfile } from '../../api/user';
import { setAuthority } from '../../utils/authority';
import { reloadAuthorized } from '../../utils/Authorized';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
const userLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
    isLoading: true,
  };
};

const userLoginSuccess = (payload) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload,
    isLoading: false,
  };
};

const userLoginFailure = (payload) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload,
    isLoading: false,
  };
};

export const userLogin = (params) => {
  return async (dispatch) => {
    dispatch(userLoginRequest());
    try {
      const response = await login(params);
      console.log(`user login response , ${JSON.stringify(response)}`);
      dispatch(userLoginSuccess(response.data));
      if (response.data.code === 1) {
        Message.success('登录成功');
        setAuthority(response.data.currentAuthority);
        reloadAuthorized();
        console.log('--login success--', response.data);
        dispatch(push('/prize/activity/list'));
      } else {
        Message.error(response.data.msg);
      }
      return response.data;
    } catch (error) {
      dispatch(userLoginFailure(error));
    }
  };
};

export const checkSession = () => {
  return async (dispatch) => {
    dispatch(userLoginRequest());
    try {
      const response = await getUserProfile();
      console.log(`check session response , ${JSON.stringify(response)}`);
      dispatch(userLoginSuccess(response.data));
      if (response.data.code === 1) {
        Message.success('登录成功');
        setAuthority(response.data.currentAuthority);
        reloadAuthorized();
        console.log('--login success--', response.data);
        dispatch(push('/prize/activity/list'));
      } else {
        Message.error(response.data.msg);
      }
      return response.data;
    } catch (error) {
      dispatch(userLoginFailure(error));
    }
  };
};
