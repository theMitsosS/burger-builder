import React, {useEffect, useState} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/modal/modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';
import {purchaseInit} from '../../store/actions/index';
import {setRedirectPath} from '../../store/actions';

const BurgerBuilder =(props)=> {
  const [purchasing, setPurchasing]= useState(false);
  useEffect(()=>{
    props.onInitIngredients();
  }, []);

  const updatePurchaseState=(ingredients)=> {
    let sum = 0;
    Object.entries(ingredients).map((ingredient) => {
      return (sum += ingredient[1]);
    });
    return sum>0;
  };
  const purchaseHandler = (doit) => {
    if (props.isAuthenticated) {
      setPurchasing(doit);
    } else {
      props.onSetAuthRedirect('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseContinueHandler = () => {
    setPurchasing(false);
    props.history.push({pathname: '/checkout'});
    props.onInitPurchase();
  };

  const disableRemoveButtonsInfo = {...props.ingredients};
  for (const key in disableRemoveButtonsInfo) {
    disableRemoveButtonsInfo[key] = disableRemoveButtonsInfo[key] <= 0;
  }
  let orderSummary = null;

  let burger = props.error ? (
			<p>Ingredients cant be loaded</p>
		) : (
			<Spinner />
		);
  if (props.ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          ingredients={props.ingredients}
          totalPrice={props.totalPrice}
          ingredientAdded={props.onIngredientAddition}
          ingredientRemoved={props.onIngredientRemoval}
          disabledInfo={disableRemoveButtonsInfo}
          ordered={purchaseHandler}
          isAuth={props.isAuthenticated}
          purchasable={updatePurchaseState(props.ingredients)}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        price={props.totalPrice}
        continuePurchase={purchaseContinueHandler}
        cancelPurchase={purchaseHandler}
      />
    );
  }
  if (props.loading) {
    orderSummary = <Spinner />;
  }

  return (
    <Aux>
      <Modal show={purchasing} closeModal={purchaseHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.builder.ingredients,
    totalPrice: state.builder.totalPrice,
    purchasable: state.builder.purchasable,
    error: state.builder.error,
    isAuthenticated: state.auth.token!==null,
  };
};

const mapDispatchToProps=(dispatch)=>{
  return {
    onIngredientAddition: (ingredient)=>dispatch(burgerBuilderActions.addIngredient(ingredient)),
    onIngredientRemoval: (ingredient)=>dispatch(burgerBuilderActions.removeIngredient(ingredient)),
    onInitIngredients: ()=>dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase: ()=>dispatch(purchaseInit()),
    onSetAuthRedirect: (path)=>dispatch(setRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
