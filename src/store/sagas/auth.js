import {put} from 'redux-saga/effects';
import {delay} from 'redux-saga/effects';
import {authFail, authStart, authSuccess, checkAuthTimeout, logout, logoutSucceed} from '../actions/auth';
import axios from 'axios';

export function* logoutSaga() {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expiresAt');
  yield localStorage.removeItem('localId');
  yield put(logoutSucceed());
}

export function* checkTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(logout());
}

export function* authSaga(action) {
  yield put(authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
		'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADW3vxA_gFm26NqMGmAC_OqvrmGCvfK_M';
  if (!action.isSignUp) {
    url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADW3vxA_gFm26NqMGmAC_OqvrmGCvfK_M';
  }
  try {
    const response = yield axios
        .post(url, authData);
		 const expiresAt = yield new Date(
        new Date().getTime() + response.data.expiresIn * 1000,
    );
    yield localStorage.setItem('expiresAt', expiresAt.toString());
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('localId', response.data.localId);
    yield put(checkAuthTimeout(response.data.expiresIn));
    yield put(authSuccess(response.data));
  } catch (error) {
    put(authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga() {
  const token=localStorage.getItem('token');
  if (token) {
    const expirationTime=localStorage.getItem('expiresAt');
    const expiresIn=(new Date(expirationTime).getTime()-new Date().getTime())/1000;
    const localId=localStorage.getItem('localId');
    yield put(authSuccess({idToken: token, localId: localId}));
    yield put(checkAuthTimeout(expiresIn));
  }
}
