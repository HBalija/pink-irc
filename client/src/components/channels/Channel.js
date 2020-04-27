import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../store/actions';


const Channel = props => {
  const { channel, activeChannel } = props;

  const socket = useSelector(state => state.socket);

  const dispatch = useDispatch();
  const onSetActiveChannel = channel => dispatch(actions.setActiveChannel(channel));
  const onClearMessages = () => dispatch(actions.clearMessages());

  const onClickHandler = e => {
    e.preventDefault();
    onSetActiveChannel(channel);
    socket.emit('message unsubscribe');
    onClearMessages();
    socket.emit('message subscribe', { activeChannelId: activeChannel.id });
  };

  const active = channel === activeChannel ? 'active' : '';

  return (
    <li className={active}>
      <p className="channel" onClick={onClickHandler}>{channel.name}</p>
    </li>
  );
};

export default Channel;
