import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/modal/modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as burgerBuilderActions from '../../store/actions/index';
import {purchaseInit} from "../../store/actions/index";
import {setRedirectPath} from "../../store/actions";

export class BurgerBuilder extends Component {
	state={
		purchasing:false,
	};

	componentDidMount() {
		this.props.onInitIngredients();

	}

	updatePurchaseState(ingredients) {
		let sum = 0;
		Object.entries(ingredients).map(ingredient => {
			return (sum += ingredient[1]);
		});
		return sum>0;
	}
	purchaseHandler = doit => {
		if(this.props.isAuthenticated){
			this.setState({
				purchasing: doit
			});
		}else{
			this.props.onSetAuthRedirect('/checkout');
			this.props.history.push('/auth');

		}
	};

	purchaseContinueHandler = () => {
		this.setState({ loading: false, purchasing: false });
		this.props.history.push({ pathname: "/checkout" });
		this.props.onInitPurchase();


	};

	render() {
		const disableRemoveButtonsInfo = { ...this.props.ingredients };
		for (let key in disableRemoveButtonsInfo) {
			disableRemoveButtonsInfo[key] = disableRemoveButtonsInfo[key] <= 0;
		}
		let orderSummary = null;

		let burger = this.props.error ? (
			<p>Ingredients can't be loaded</p>
		) : (
			<Spinner />
		);
		if (this.props.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ingredients} />
					<BuildControls
						ingredients={this.props.ingredients}
						totalPrice={this.props.totalPrice}
						ingredientAdded={this.props.onIngredientAddition}
						ingredientRemoved={this.props.onIngredientRemoval}
						disabledInfo={disableRemoveButtonsInfo}
						ordered={this.purchaseHandler}
						isAuth={this.props.isAuthenticated}
						purchasable={this.updatePurchaseState(this.props.ingredients)}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ingredients}
					price={this.props.totalPrice}
					continuePurchase={this.purchaseContinueHandler}
					cancelPurchase={this.purchaseHandler}
				/>
			);
		}
		if (this.props.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} closeModal={this.purchaseHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ingredients:state.builder.ingredients,
		totalPrice:state.builder.totalPrice,
		purchasable:state.builder.purchasable,
		error: state.builder.error,
		isAuthenticated: state.auth.token!==null
	};
};

const mapDispatchToProps=dispatch=>{
	return{
		onIngredientAddition:(ingredient)=>dispatch(burgerBuilderActions.addIngredient(ingredient)),
		onIngredientRemoval:(ingredient)=>dispatch(burgerBuilderActions.removeIngredient(ingredient)),
		onInitIngredients:()=>dispatch(burgerBuilderActions.initIngredients()),
		onInitPurchase:()=>dispatch(purchaseInit()),
		onSetAuthRedirect:(path)=>dispatch(setRedirectPath(path))
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
