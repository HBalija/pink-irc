import React, { useState }from 'react';
import './App.css';

import ChannelSection from './components/channels/ChannelSection';


const App = () => {

  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState('');

  const addChannelHandler = name => {
    setChannels(prevState => [ ...prevState, { id: channels.length, name }]);
    // TODO: Send to server
  };

  const setChannelHandler = activeChannel => {
    setActiveChannel(activeChannel);
    // TODO: Get Channels messages
  };

  return (
    <ChannelSection
      channels={channels}
      addChannel={addChannelHandler}
      setChannel={setChannelHandler} />
  );
};

export default App;
