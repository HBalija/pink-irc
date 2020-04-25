import React from 'react';
import { useDispatch } from 'react-redux';

import { setActiveChannel } from '../../store/actions/channelActions';

import '../../App.css';


const Channel = props => {
  const { channel, activeChannel } = props;

  const dispatch = useDispatch();
  const onSetActiveChannel = channel => dispatch(setActiveChannel(channel));

  const onClickHandler = e => {
    e.preventDefault();
    onSetActiveChannel(channel);
  };

  const active = channel === activeChannel ? 'active' : '';

  return (
    <li className={active}>
      <p className="channel-item" onClick={onClickHandler}>{channel.name}</p>
    </li>
  );
};

export default Channel;
