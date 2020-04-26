import React from 'react';
import { useSelector } from 'react-redux';

import MessageList from './MessageList';
import MessageForm from './MessageForm';

const MessageSection = props => {

  const activeChannel = useSelector(state => state.channels.activeChannel);
  return (
    <div className="messages-container panel panel-default">
      <div className="panel-heading">
        <strong>{activeChannel.name}</strong>
      </div>
      <div className="panel-body messages">
        <MessageList { ...props } />
        <MessageForm { ...props } />
      </div>
    </div>
  );
};

export default MessageSection;
