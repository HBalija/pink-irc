import React from 'react';
import { useSelector } from 'react-redux';

import Message from './Message';


const MessageList = () => {

  const messages = useSelector(state => state.messages);

  return (
    <ul>{messages.map(msg => <Message key={msg.id} message={msg} />)}</ul>
  );
};

export default MessageList;
