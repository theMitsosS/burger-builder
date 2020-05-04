import React, {useEffect} from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import {fetchOrders, deleteOrder} from '../../store/actions';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Orders =(props)=> {
  useEffect(()=>{
	  props.onFetchOrders(props.token, props.userId);
  }, []);

  const orders = !props.loading ? (
			props.orders.map((order) => {
			  return (
			    <Order
			      key={order.id}
			      delete={() => props.onDeleteOrder(order.id, props.token)}
			      price={order.price}
			      ingredients={order.ingredients}
			    />
			  );
			})
		) : (
			<Spinner />
		);
  return <div>{orders}</div>;
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
    onDeleteOrder: (id, token) => dispatch(deleteOrder(id, token)),
  };
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withErrorHandler(Orders, axios));
