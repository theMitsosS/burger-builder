import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import {FETCH_ORDERS_START} from './actionTypes';
import {FETCH_ORDERS_SUCCESS} from './actionTypes';
import {FETCH_ORDERS_FAIL} from './actionTypes';
import {DELETE_ORDER_START} from './actionTypes';
import {DELETE_ORDER_SUCCESS} from './actionTypes';
import {DELETE_ORDER_FAIL} from './actionTypes';
import qs from 'query-string';
import {PURCHASE_BURGER} from './actionTypes';
import {FETCH_ORDERS} from './actionTypes';
import {DELETE_ORDER} from "./actionTypes";

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
	return {
		type: PURCHASE_BURGER,
		orderData,
		token,
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	};
};

export const fetchOrdersStart = () => {
	return {
		type: FETCH_ORDERS_START,
	};
};


export const fetchOrdersFail = () => {
	return {
		type: FETCH_ORDERS_FAIL,
	};
};

export const fetchOrdersSuccess = (orders) => {
	return {
		type: FETCH_ORDERS_SUCCESS,
		orders: orders,
	};
};

export const fetchOrders = (token, userId) => {
	return {
		type: FETCH_ORDERS,
		token,
		userId,
	};
};

export const deleteOrderStart = () => {
	return {
		type: DELETE_ORDER_START,
	};
};

export const deleteOrderStartSuccess = (id) => {
	return {
		type: DELETE_ORDER_SUCCESS,
		loading: false,
		id: id,
	};
};

export const deleteOrderStartFail = () => {
	return {
		type: DELETE_ORDER_FAIL,
		loading: false,
	};
};

export const deleteOrder = (id, token) => {
	return {
		type: DELETE_ORDER,
		id,
		token,
	};
};
