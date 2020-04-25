import React from 'react';
import { useSelector } from 'react-redux';

import Channel from './Channel';


const ChannelList = () => {

  const channels = useSelector(state => state.channels.channels);
  const activeChannel = useSelector(state => state.channels.activeChannel);

  return (
    <ul>
      {channels.map(chan => (
        <Channel
          key={chan.id}
          channel={chan}
          activeChannel={activeChannel} />
      ))}
    </ul>
  );
};

export default ChannelList;
