import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as actions from './store/actions';
import Socket from './socket';

import './App.css';

import ChannelSection from './components/channels/ChannelSection';
import UserSection from './components/users/UserSection';
import MessageSection from './components/messages/MessageSection';


const App = () => {

  const dispatch = useDispatch();
  const onSetSocket = socket => dispatch(actions.setSocket(socket));
  const onSocketConnect = () => dispatch(actions.socketConnect());
  const onSocketDisconnect = () => dispatch(actions.socketDisconnect());
  const onAddChannel = channel => dispatch(actions.addChannel(channel));
  const onAddUser = user => dispatch(actions.addUser(user));
  const onEditUser = user => dispatch(actions.editUser(user));
  const onRemoveUser = userId => dispatch(actions.removeUser(userId));
  const onAddMessage = message => dispatch(actions.addMessage(message));

  useEffect(() => {
    const socket = new Socket('ws://localhost:8000');
    onSetSocket(socket);

    // onopen / onclose event listeners
    socket.on('connect', () => {
      onSocketConnect();
      socket.emit('channel subscribe');
      socket.emit('user subscribe');
    });
    socket.on('disconect', () => onSocketDisconnect());

    // onmessage event listeners
    socket.on('channel add', data => onAddChannel(data));
    socket.on('user add', data => onAddUser(data));
    socket.on('user edit', data => onEditUser(data));
    socket.on('user remove', data => onRemoveUser(data));
    socket.on('message add', data => onAddMessage(data));

  }, []); // eslint-disable-line

  return (
    <div className="app">
      <div className="nav">
        <ChannelSection />
        <UserSection />
      </div>
      <MessageSection />
    </div>
  );
};

export default App;
