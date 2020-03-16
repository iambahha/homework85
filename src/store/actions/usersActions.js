import axiosApi from '../../axios-api';
import {push} from 'connected-react-router';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

export const logoutUserRequest = () => ({type: LOGOUT_USER});

const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});

const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const registerUser = userData => {
  return async dispatch => {
    try {
      await axiosApi.post('/users', userData);
      dispatch(registerUserSuccess());
      dispatch(push('/'));
    } catch (error) {
      if (error.response) {
        dispatch(registerUserFailure(error.response.data));
      } else {
        dispatch(registerUserFailure({global: 'Network error or no internet'}));
      }
    }
  }
};

export const loginUser = userData => {
  return async dispatch => {
    try {
      const response = await axiosApi.post('/users/sessions', userData);
      dispatch(loginUserSuccess(response.data.user));
      dispatch(push('/'));
    } catch (error) {
      dispatch(loginUserFailure(error.response.data));
    }
  }
};

export const logoutUser = () => {
    return dispatch => {
        dispatch(logoutUserRequest());
        dispatch(push('/login'));
    };
};