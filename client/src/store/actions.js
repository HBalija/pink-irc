import * as actionTypes from './actionTypes';


// WS actions

export const socketConnect = () => ({ type: actionTypes.SOCKET_CONNECT });

export const socketDisconnect = () => ({ type: actionTypes.SOCKET_DISCONNECT });

export const setSocket = socket => ({ type: actionTypes.SET_SOCKET, socket });


// CHANNELS actions

export const addChannel = channel => (
  { type: actionTypes.ADD_CHANNEL, newChannel: channel });

export const setActiveChannel = channel => (
  { type: actionTypes.SET_ACTIVE_CHANNEL, newActiveChannel: channel });


// USERS actions

export const addUser = user => (
  { type: actionTypes.ADD_USER, newUser: user });

export const removeUser = userId => ({ type: actionTypes.REMOVE_USER, userId });

export const editUser = user => ({ type: actionTypes.EDIT_USER, newUser: user });

// MESSAGES actions

export const addMessage = message => (
  { type: actionTypes.ADD_MESSAGE, newMessage: message });

export const clearMessages = () => ({ type: actionTypes.CLEAR_MESSAGES });
