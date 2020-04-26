import * as actionTypes from './actionTypes';


// WS actions

export const wsConnect = () => ({ type: actionTypes.WS_CONNECT });

export const wsDisconnect = () => ({ type: actionTypes.WS_DISCONNECT });

export const setWs = ws => ({ type: actionTypes.SET_WS, ws });


// CHANNELS actions

export const addChannel = channel => (
  { type: actionTypes.ADD_CHANNEL, newChannel: channel });

export const setActiveChannel = channel => (
  { type: actionTypes.SET_ACTIVE_CHANNEL, newActiveChannel: channel });


// USERS actions

export const addUser = user => (
  { type: actionTypes.ADD_USER, newUser: user });


// MESSAGES actions

export const addMessage = message => (
  { type: actionTypes.ADD_MESSAGE, newMessage: message });
