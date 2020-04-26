import React from 'react';
import './App.css';

import ChannelSection from './components/channels/ChannelSection';
import UserSection from './components/users/UserSection';
import MessageSection from './components/messages/MessageSection';


const App = () => {
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
