import { createStore, compose } from 'redux';

import reducer from './reducer';


const composeEnhancers = (process.env.NODE_ENV === 'development' ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;


export default () => createStore(reducer, composeEnhancers());
