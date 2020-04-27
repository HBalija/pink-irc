import React, { useState } from 'react';
import { useSelector } from 'react-redux';


const MessageForm = () => {

  const [message, setMessage] = useState('');

  const activeChannel = useSelector(state => state.activeChannel);
  const users = useSelector(state => state.users);
  const messagesLength = useSelector(state => state.messages.length);
  const socket = useSelector(state => state.socket);

  const onSubmit = e => {
    e.preventDefault();

    const data = {
      id: messagesLength,
      channelId: activeChannel.id,
      message: message,
      createdAt: new Date(),
      author: users.length > 0 ? users[users.length - 1].name : 'anonymous'
    };
    socket.emit('message add', data);

    setMessage('');
  };

  let input = null;
  if (activeChannel.id !== undefined) {
    input = (
      <input
        type="text"
        className="form-control"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Add message..." />
    );
  }

  return(
    <form onSubmit={onSubmit}>
      <div className="form-group">
        {input}
      </div>
    </form>
  );
};

export default MessageForm;
