import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import createSagaMiddleware from 'redux-saga';
import {watchAuth} from './store/sagas/index';
import {watchBurgerBuilder, watchOrder} from './store/sagas';

const sagaMiddleware=createSagaMiddleware();

const combinedReducers=combineReducers({builder: burgerBuilderReducer, order: orderReducer, auth: authReducer});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combinedReducers,
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware )),
);
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
