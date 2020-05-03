import {
  AUTH_FAIL,
  AUTH_INITIATE_LOGOUT,
  CHECK_AUTH_TIMEOUT,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_SUCCESS,
  SET_AUTH_REDIRECT, AUTH_INITIATE, AUTH_CHECK_STATE,
} from './actionTypes';


export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (data) => {
  return {
    type: AUTH_SUCCESS,
    localId: data.localId,
    idToken: data.idToken,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, isSignUp) => {
  return {
    type: AUTH_INITIATE,
    email: email,
    password: password,
    isSignUp: isSignUp,
  };
};

export const logout=()=>{
  return {
    type: AUTH_INITIATE_LOGOUT,
  };
};

export const logoutSucceed=()=>{
  return {
    type: AUTH_LOGOUT,
  };
};

export const checkAuthTimeout =(expirationTime)=>{
  return {
    type: CHECK_AUTH_TIMEOUT,
    expirationTime: expirationTime,
  };
};


export const setRedirectPath=(path)=>{
  return {
    type: SET_AUTH_REDIRECT,
    redirectPath: path,
  };
};

export const authCheckState=()=>{
  return {
    type: AUTH_CHECK_STATE,
  };
};
