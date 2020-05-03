import React, { useEffect,Suspense} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Redirect, Route, withRouter} from 'react-router';
import {Switch} from 'react-router-dom';
import Logout from './containers/auth/logout/logout';
import {authCheckState} from './store/actions/index';
import {connect} from 'react-redux';
import Spinner from './components/UI/spinner/spinner'
import CheckoutSummary from "./components/Order/CheckoutSummary/CheckoutSummary";

const Checkout= React.lazy(()=>{
	return import('./containers/Checkout/Checkout');
});
const Orders= React.lazy(()=>{
	return import('./containers/Orders/Orders');
});
const Auth= React.lazy(()=>{
	return import('./containers/auth/Auth');
});


const App = props => {
  useEffect(()=>{
    props.onAppLoad();
  },[]);

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route exact path="/" component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  );
  if (props.loggedIn) {
    routes = (
      <Switch>
        <Route path="/checkout" render={()=><Checkout/>} />
        <Route path="/orders" render={()=><Orders/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={()=><Auth/>} />
        <Route exact path="/" component={BurgerBuilder} />
      </Switch>
    );
  }
	return <Layout><Suspense fallback={<Spinner/>}>{routes}</Suspense></Layout>;
};

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
