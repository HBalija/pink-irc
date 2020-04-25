import { createStore, combineReducers, compose } from 'redux';

import channelReducer from './reducers/channelReducer';
import userReducer from './reducers/userReducer';


const composeEnhancers = (process.env.NODE_ENV === 'development' ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;


export default () => {
  const store = createStore(
    combineReducers({
      channels: channelReducer,
      users: userReducer
    }),
    composeEnhancers()
  );
  return store;
};
