import axios from '../../axios-orders';
import {put} from 'redux-saga/effects';
import {
  purchaseBurgerStart,
  purchaseBurgerSuccess,
  purchaseBurgerFail,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFail,
  deleteOrderStart,
  deleteOrderStartSuccess,
} from '../actions/index';
import qs from 'query-string';
import {deleteOrderStartFail} from '../actions/order';

export function* purchaseBurgerSaga(action) {
  yield put(purchaseBurgerStart());
  try {
    const response = yield axios.post(
        '/orders.json?auth=' + action.token,
        action.orderData,
    );
    yield put(purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch (error) {
    yield put(purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  try {
    yield put(fetchOrdersStart());
    const queryParams =
			'auth=' +
			action.token +
			'&orderBy="userId"&equalTo="' +
			action.userId +
			'"';
    const response = yield axios.get('/orders.json?' + queryParams);
    yield put(fetchOrdersSuccess(response.data));
  } catch (error) {
    console.log(error);
    console.log('dispatching error');
    yield fetchOrdersFail(error);
  }
}

export function* deleteOrderSaga(action) {
  const {token, id}=action;
  yield put(deleteOrderStart());
  const queryString = qs.stringify({id, auth: token});
  try {
    yield axios.delete('/orders.json/?' + queryString);
    yield put(deleteOrderStartSuccess(id));
  } catch (error) {
    put(deleteOrderStartFail());
  }
}
