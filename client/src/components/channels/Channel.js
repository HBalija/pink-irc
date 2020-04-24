import React from 'react';

import '../../App.css';


const Channel = ({ channel, setChannel, activeChannel }) => {

  const onClickHandler = e => {
    e.preventDefault();
    setChannel(channel);
  };

  const active = channel === activeChannel ? 'active' : '';

  return (
    <li className={active}>
      <p className="channel-item" onClick={onClickHandler}>{channel.name}</p>
    </li>
  );
};

export default Channel;
