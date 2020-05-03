import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Redirect, Route, withRouter } from "react-router";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
	clickCancelHandler = () => {
		this.props.history.push({ pathname: "/", state: this.props.ingredients });
	};

	clickContinueHandler = () => {
		this.props.history.push({
			pathname: "/checkout/contact-data/",
			search: this.props.location.search
		});
	};
	render() {
		const ingredients = { ...this.props.ingredients };
		const redirect = this.props.purchased ? <Redirect to="/" /> : null;
		delete ingredients.totalPrice;
		if (this.props.ingredients) {
			return (
				<div>
					{redirect}
					<CheckoutSummary
						cancel={this.clickCancelHandler}
						continue={this.clickContinueHandler}
						ingredients={ingredients}
					/>
					<Route
						path={this.props.match.path + "/contact-data"}
						component={ContactData}
					/>
				</div>
			);
		} else {
			this.props.history.push("/");
		}
		return null;
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.builder.ingredients,
		purchased: state.order.purchased
	};
};

export default connect(mapStateToProps)(withRouter(Checkout));
