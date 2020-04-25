import React from 'react';
import './App.css';

import ChannelSection from './components/channels/ChannelSection';


const App = () => {

  return (
    <div className="app">
      <div className="nav">
        <ChannelSection />
      </div>
    </div>

  );
};

export default App;
