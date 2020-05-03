import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import {FETCH_ORDERS_START} from './actionTypes';
import {FETCH_ORDERS_SUCCESS} from './actionTypes';
import {FETCH_ORDERS_FAIL} from './actionTypes';
import {DELETE_ORDER_START} from './actionTypes';
import {DELETE_ORDER_SUCCESS} from './actionTypes';
import {DELETE_ORDER_FAIL} from './actionTypes';
import qs from 'query-string';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
        .post('/orders.json?auth='+token, orderData)
        .then((response) => {
          dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch((error) => {
          dispatch(purchaseBurgerFail(error));
        });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

const fetchOrdersStart = () => {
  return {
    type: FETCH_ORDERS_START,
  };
};


const fetchOrdersFail = () => {
  return {
    type: FETCH_ORDERS_FAIL,
  };
};

const fetchOrdersSuccess = (orders) => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams='auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
    console.log(queryParams);
    axios.get('/orders.json?'+queryParams).then((response)=>{
      dispatch(fetchOrdersSuccess(response.data));
    }).catch((error)=>{
      console.log(error);
      console.log('dispatching error');
      fetchOrdersFail(error);
    });
  };
};

const deleteOrderStart = () => {
  return {
    type: DELETE_ORDER_START,
  };
};

const deleteOrderStartSuccess = (id) => {
  return {
    type: DELETE_ORDER_SUCCESS,
    loading: false,
    id: id,
  };
};

const deleteOrderStartFail = () => {
  return {
    type: DELETE_ORDER_FAIL,
    loading: false,
  };
};

export const deleteOrder = (id, token) => {
  return (dispatch) => {
    dispatch(deleteOrderStart());
    const queryString=qs.stringify({id, auth: token});
    axios
        .delete('/orders.json/?' + queryString)
        .then((response) => {
          dispatch(deleteOrderStartSuccess(id));
        })
        .catch((error) => {
          dispatch(deleteOrderStartFail());
        });
  };
};
