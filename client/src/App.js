import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';

import ChannelSection from './components/channels/ChannelSection';
import UserSection from './components/users/UserSection';
import MessageSection from './components/messages/MessageSection';


const App = () => {

  const [messages, setMessages] = useState([]);

  const users = useSelector(state => state.users.users);


  const addMessage = body => {
    const createdAt = new Date();
    const author = users.length > 0 ? users[users.length - 1].name : 'annonymous';

    setMessages(prevState => [...prevState, { id: messages.length, body, createdAt, author }]);
  };

  return (
    <div className="app">
      <div className="nav">
        <ChannelSection />
        <UserSection />
      </div>
      <MessageSection messages={messages} addMessage={addMessage} />
    </div>

  );
};

export default App;
