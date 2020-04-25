import React, { useState } from 'react';
import './App.css';

import ChannelSection from './components/channels/ChannelSection';
import UserSection from './components/users/UserSection';

const App = () => {

  const [users, setUsers] = useState([]);

  const setUserName = name => {
    setUsers(prevState => [ ...prevState, { id: users.length, name }]);
  };

  return (
    <div className="app">
      <div className="nav">
        <ChannelSection />
        <UserSection users={users} setUserName={setUserName} />
      </div>
    </div>

  );
};

export default App;
