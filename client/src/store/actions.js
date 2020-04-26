import * as actionTypes from './actionTypes';

export const addChannel = channel => (
  { type: actionTypes.ADD_CHANNEL, newChannel: channel });

export const setActiveChannel = channel => (
  { type: actionTypes.SET_ACTIVE_CHANNEL, newActiveChannel: channel });

export const addUser = user => (
  { type: actionTypes.ADD_USER, newUser: user });

export const addMessage = message => (
  { type: actionTypes.ADD_MESSAGE, newMessage: message });
