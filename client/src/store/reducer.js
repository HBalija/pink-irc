import * as actionTypes from './actionTypes';

const initialState = {
  channels: [],
  activeChannel: {},
  users: [],
  messages: [],
  connected: false,
  socket: {}
};

export default (state = initialState, action) => {
  switch (action.type) {

  case actionTypes.ADD_CHANNEL:
    return { ...state, channels: [...state.channels, action.newChannel] };

  case actionTypes.SET_ACTIVE_CHANNEL:
    return { ...state, activeChannel: action.newActiveChannel };

  case actionTypes.ADD_USER:
    return { ...state, users: [...state.users, action.newUser] };

  case actionTypes.REMOVE_USER:
    return { ...state, users: state.users.filter(u => u.id !== action.userId) };

  case actionTypes.EDIT_USER:
    return { ...state, users: state.users.map(u => u.id === action.user.id ? action.user : u) };

  case actionTypes.ADD_MESSAGE:
    return { ...state, messages: [...state.messages, action.newMessage] };

  case actionTypes.CLEAR_MESSAGES:
    return { ...state, messages: [] };

  case actionTypes.SOCKET_CONNECT:
    return { ...state, connected: true };

  case actionTypes.SOCKET_DISCONNECT:
    return { ...state, connected: false };

  case actionTypes.SET_SOCKET:
    return { ...state, socket: action.socket };

  default:
    return state;
  }
};
