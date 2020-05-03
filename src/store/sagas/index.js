import {
	authCheckStateSaga,
	authSaga,
	checkTimeoutSaga,
	logoutSaga,
} from './auth';
import * as actionTypes from '../actions/actionTypes';
import {takeEvery, all} from 'redux-saga/effects';
import {initIngredientsSaga} from './burgerBuilder';
import {INIT_INGREDIENTS} from '../actions/actionTypes';
import {purchaseBurgerSaga, fetchOrders, deleteOrderSaga, fetchOrdersSaga} from './order';
import {PURCHASE_BURGER} from '../actions/actionTypes';
import {FETCH_ORDERS} from '../actions/actionTypes';
import {DELETE_ORDER} from '../actions/actionTypes';

export function* watchAuth() {
	yield all([
		takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
		takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkTimeoutSaga),
		takeEvery(actionTypes.AUTH_INITIATE, authSaga),
		takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
	]);
}

export function* watchBurgerBuilder() {
	yield takeEvery(INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
	yield takeEvery(PURCHASE_BURGER, purchaseBurgerSaga);
	yield takeEvery(FETCH_ORDERS, fetchOrdersSaga);
	yield takeEvery(DELETE_ORDER, deleteOrderSaga);
}
