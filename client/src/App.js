import React from 'react';
import './App.css';

import ChannelSection from './components/channels/ChannelSection';
import UserSection from './components/users/UserSection';

const App = () => {

  return (
    <div className="app">
      <div className="nav">
        <ChannelSection />
        <UserSection />
      </div>
    </div>

  );
};

export default App;
