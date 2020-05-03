import {AUTH_FAIL, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS, SET_AUTH_REDIRECT} from './actionTypes';
import axios from 'axios';

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADW3vxA_gFm26NqMGmAC_OqvrmGCvfK_M';
    if (!isSignUp) {
      url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADW3vxA_gFm26NqMGmAC_OqvrmGCvfK_M';
    }

    axios
        .post(url, authData)
        .then((response) => {
          const expiresAt=new Date(new Date().getTime()+response.data.expiresIn*1000);
          localStorage.setItem('expiresAt', expiresAt);
          localStorage.setItem('token', response.data.idToken);
          localStorage.setItem('localId', response.data.localId);
          dispatch(authSuccess(response.data));
          dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch((error) => {
          dispatch(authFail(error.response.data.error));
        });
  };
};

export const logout=()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('expiresAt');
  localStorage.removeItem('localId');
  return {
    type: AUTH_LOGOUT,
  };
};

const checkAuthTimeout =(expirationTime)=>{
  return (dispatch)=>{
    setTimeout(()=>{
      dispatch(logout());
    }, expirationTime*1000);
  };
};

const authSuccess = (data) => {
  return {
    type: AUTH_SUCCESS,
    localId: data.localId,
    idToken: data.idToken,
  };
};

const authStart = () => {
  return {
    type: AUTH_START,
  };
};

const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const setRedirectPath=(path)=>{
  return {
    type: SET_AUTH_REDIRECT,
    redirectPath: path,
  };
};

export const authCheckState=()=>{
  return (dispatch)=>{
    const token=localStorage.getItem('token');
    if (token) {
      const expirationTime=localStorage.getItem('expiresAt');
      const expiresIn=(new Date(expirationTime).getTime()-new Date().getTime())/1000;
      const localId=localStorage.getItem('localId');
      dispatch(authSuccess({idToken: token, localId: localId}));
      dispatch(checkAuthTimeout(expiresIn));
    }
  };
};
