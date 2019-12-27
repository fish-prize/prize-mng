/*
 *
 * profile actions
 *
 */
import { push } from 'react-router-redux';
import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
} from './constants';
import { getUserProfile } from '../../api/user';
import { save as localSave } from '../../utils/localStorage';


const userProfileRequest = () => {
  return {
    type: USER_PROFILE_REQUEST,
    isLoading: true,
  };
};

const userProfileFailure = (payload) => {
  return {
    type: USER_PROFILE_FAILURE,
    isLoading: false,
    payload,
  };
};

const userProfileSuccess = (payload) => {
  // console.log('--localStorageSave--', localSave, payload)
  localSave('his_login_username', payload.userName);
  return {
    type: USER_PROFILE_SUCCESS,
    isLoading: false,
    payload,
  };
};

export const userProfile = (params) => {
  return async (dispatch) => {
    dispatch(userProfileRequest());
    try {
      const response = await getUserProfile(params);
      console.log('--user profile--', response.data);
      if (response && response.data.code === 1) {
        dispatch(userProfileSuccess(response.data.data));
      } else {
        dispatch(push('/user/login'));
      }
    } catch (error) {
      dispatch(userProfileFailure(error));
    }
  };
};
