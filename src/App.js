import React, { useEffect,Suspense} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Redirect, Route, withRouter} from 'react-router';
import {Switch} from 'react-router-dom';
import Logout from './containers/auth/logout/logout';
import {authCheckState} from './store/actions/index';
import {connect} from 'react-redux';
import Spinner from './components/UI/spinner/spinner'

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
  },[props]);

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
        <Route path="/checkout" render={(props)=><Checkout{...props}/>} />
        <Route path="/orders" render={(props)=><Orders{...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props)=><Auth {...props} />} />
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
