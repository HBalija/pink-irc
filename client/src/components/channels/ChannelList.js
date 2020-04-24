import React from 'react';

import Channel from './Channel';

import '../../App.css';


const ChannelList = ({ channels, setChannel, activeChannel }) => {
  return (
    <ul>
      {channels.map(chan => (
        <Channel
          key={chan.id}
          channel={chan}
          activeChannel={activeChannel}
          setChannel={setChannel} />
      ))}
    </ul>
  );
};

export default ChannelList;
