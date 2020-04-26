import React from 'react';
import fecha from 'fecha';


const Message = ({ message }) => {

  const createdAt = fecha.format(message.createdAt, 'HH:mm:ss MM/DD/YY');
  return (
    <li className="message">
      <div className="author">
        <strong>{message.author}</strong>
        <i className="timestamp">{createdAt}</i>
      </div>
      <dib className="body">{message.body}</dib>
    </li>
  );
};

export default Message;
