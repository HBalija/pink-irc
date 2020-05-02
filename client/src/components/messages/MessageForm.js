import React, { useState } from 'react';
import { useSelector } from 'react-redux';


const MessageForm = () => {

  const [message, setMessage] = useState('');

  const activeChannel = useSelector(state => state.activeChannel);
  const socket = useSelector(state => state.socket);

  const onSubmit = e => {
    e.preventDefault();

    const data = {
      channelId: activeChannel.id,
      body: message
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
