import {
	PURCHASE_BURGER_SUCCESS,
	PURCHASE_BURGER_START,
	PURCHASE_BURGER_FAIL,
	PURCHASE_INIT,
	FETCH_ORDERS_START,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAIL,
	DELETE_ORDER_START,
	DELETE_ORDER_SUCCESS,
	DELETE_ORDER_FAIL,
} from '../actions/actionTypes';

const INITIAL_STATE = {
	orders: [],
	loading: false,
	purchased: false,
};

const orderReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case PURCHASE_BURGER_START:
		return {
			...state,
			loading: true,
		};
	case PURCHASE_BURGER_SUCCESS:
		const newOrder = {
			...action.orderData,
			id: action.orderId,
		};
		return {
			...state,
			loading: false,
			orders: state.orders.concat(newOrder),
			purchased: true,
		};
	case PURCHASE_BURGER_FAIL:
		return {
			...state,
			loading: false,
		};
	case PURCHASE_INIT:
		return {
			...state,
			purchased: false,
		};
	case FETCH_ORDERS_START:
		return {
			...state,
			loading: true,
		};
	case FETCH_ORDERS_SUCCESS:
		const array = [];
		if (action.orders) {
			Object.entries(action.orders).forEach((order) => {
				const obj = {
					id: order[0],
					...order[1],
				};
				array.push(obj);
			});
		}
		return {
			...state,
			orders: array,
			loading: false,
		};
	case FETCH_ORDERS_FAIL:
		return {
			...state,
			loading: false,
		};
	case DELETE_ORDER_START:
		return {
			...state,
			loading: true,
		};
	case DELETE_ORDER_SUCCESS:
		return {
			...state,
			loading: false,
			orders: state.orders.filter((order) => order.id !== action.id),
		};
	case DELETE_ORDER_FAIL:
		return {
			...state,
			loading: false,
		};
	default:
		return {...state};
	}
};

export default orderReducer;
