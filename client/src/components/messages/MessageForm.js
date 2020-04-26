import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const MessageForm = props => {

  const [message, setMessage] = useState('');

  const activeChannel = useSelector(state => state.channels.activeChannel);

  const onSubmit = e => {
    e.preventDefault();

    props.addMessage(message);
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
