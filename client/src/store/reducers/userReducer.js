import * as actionTypes from '../actionTypes';

const initialState = {
  users: []
};

export default (state = initialState, action) => {
  switch (action.type) {

  case actionTypes.ADD_USER:
    return { ...state, users: [ ...state.users, action.newUser] };

  default:
    return state;
  }
};
