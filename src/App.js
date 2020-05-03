import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Redirect, Route, withRouter} from 'react-router';
import {Switch} from 'react-router-dom';
import Logout from './containers/auth/logout/logout';
import {authCheckState} from './store/actions/index';
import asyncComponent from './hoc/async/asyncComponent';
import {connect} from 'react-redux';

const AsyncCheckout= asyncComponent(()=>{
	return import('./containers/Checkout/Checkout');
});
const AsyncOrders= asyncComponent(()=>{
	return import('./containers/Orders/Orders');
});
const AsyncAuth= asyncComponent(()=>{
	return import('./containers/auth/Auth');
});

class App extends Component {
	componentWillMount() {
		this.props.onAppLoad();
	}

	render() {
		let routes = (
			<Switch>
				<Route path="/auth" component={AsyncAuth} />
				<Route exact path="/" component={BurgerBuilder} />
				<Redirect to='/' />
			</Switch>
		);
		if (this.props.loggedIn) {
			routes = (
				<Switch>
					<Route path="/checkout" component={AsyncCheckout} />
					<Route path="/orders" component={AsyncOrders} />
					<Route path="/logout" component={Logout} />
					<Route path="/auth" component={AsyncAuth} />
					<Route exact path="/" component={BurgerBuilder} />
				</Switch>
			);
		}

		return <Layout>{routes}</Layout>;
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAppLoad: () => dispatch(authCheckState()),
	};
};
const mapStateToProps = (state) => {
	return {
		loggedIn: state.auth.token !== null,
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
