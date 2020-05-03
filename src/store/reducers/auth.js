import {
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_SUCCESS, SET_AUTH_REDIRECT,
} from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  redirectPath: '/',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_LOGOUT:
      return authLogout(state);
    case SET_AUTH_REDIRECT:
      return setAuthRedirect(state, action);
    default:
      return state;
  }
};

const authStart = (state) => {
  return updateObject(state, {loading: true, error: null});
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    token: action.idToken,
    userId: action.localId,
    error: null,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const authLogout = (state) => {
  return updateObject(state, {token: null, userId: null});
};

const setAuthRedirect=(state, action)=> {
  return updateObject(state, {redirectPath: action.redirectPath});
};

export default reducer;
