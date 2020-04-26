import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addMessage } from '../../store/actions';

const MessageForm = () => {

  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const onStartAddMessage = (body, createdAt, author) => {
    dispatch(addMessage({ id: messagesLength, body, createdAt, author }));
  };

  const activeChannel = useSelector(state => state.activeChannel);
  const users = useSelector(state => state.users);
  const messagesLength = useSelector(state => state.messages.length);

  const onSubmit = e => {
    e.preventDefault();

    const createdAt = new Date();
    const author = users.length > 0 ? users[users.length - 1].name : 'annonymous';


    onStartAddMessage(message, createdAt, author);
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
