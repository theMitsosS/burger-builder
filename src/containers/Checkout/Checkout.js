import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Redirect, Route, withRouter} from 'react-router';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

const Checkout =(props)=> {
  const clickCancelHandler = () => {
    props.history.push({pathname: '/', state: props.ingredients});
  };

  const clickContinueHandler = () => {
    props.history.push({
      pathname: '/checkout/contact-data/',
      search: props.location.search,
    });
  };
  const ingredients = {...props.ingredients};
  const redirect = props.purchased ? <Redirect to="/" /> : null;
  delete ingredients.totalPrice;
  if (props.ingredients) {
    return (
      <div>
        {redirect}
        <CheckoutSummary
          cancel={clickCancelHandler}
          continue={clickContinueHandler}
          ingredients={ingredients}
        />
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  } else {
    props.history.push('/');
  }
  return null;
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.builder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(withRouter(Checkout));
