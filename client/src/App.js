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
  const onStartAddChannel = channel => dispatch(actions.addChannel(channel));

  useEffect(() => {
    const socket = new Socket('ws://echo.websocket.org');
    onSetSocket(socket);

    // onopen / onclose event listeners
    socket.on('connect', onSocketConnect);
    socket.on('disconect', onSocketDisconnect);

    // onmessage event listeners
    socket.on('channel add', data => onStartAddChannel(data));

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
