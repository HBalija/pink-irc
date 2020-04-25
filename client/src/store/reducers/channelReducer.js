import * as actionTypes from '../actionTypes';

const initialState = {
  channels: [],
  activeChannel: {}
};

export default (state = initialState, action) => {
  switch (action.type) {

  case actionTypes.ADD_CHANNEL:
    return { ...state, channels: [ ...state.channels, action.newChannel] };

  case actionTypes.SET_ACTIVE_CHANNEL:
    return { ...state, activeChannel: action.newActiveChannel };

  default:
    return state;
  }
};
