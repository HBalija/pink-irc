import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as actions from './store/actions';

import './App.css';

import ChannelSection from './components/channels/ChannelSection';
import UserSection from './components/users/UserSection';
import MessageSection from './components/messages/MessageSection';


const App = () => {

  // const connected = useSelector(state => state.connected);

  const dispatch = useDispatch();
  const onSetWs = ws => dispatch(actions.setWs(ws));
  // const onWsConnect = () => dispatch(actions.wsConnect());
  // const onWsDisconnect = () => dispatch(actions.wsDisconnect());
  const onStartAddChannel = channel => dispatch(actions.addChannel(channel));

  useEffect(() => {
    const ws = new WebSocket('ws://echo.websocket.org');

    ws.onmessage = message;
    // ws.onopen = open;
    // ws.onclose = close;

    onSetWs(ws);
  }, []); // eslint-disable-line

  const message = e => {
    const event = JSON.parse(e.data);
    if (event.name === 'channel add') newChannel(event.data);
  };

  const newChannel = channel => {
    onStartAddChannel(channel);
  };

  // const open = () => {
  //   onWsConnect();
  // };

  // const close = () => {
  //   onWsDisconnect();
  // };

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
