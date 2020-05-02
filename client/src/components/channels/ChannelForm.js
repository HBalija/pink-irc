import React, { useState } from 'react';
import { useSelector } from 'react-redux';


const ChannelForm = () => {

  const [value, setValue] = useState('');

  const socket = useSelector(state => state.socket);

  const onSubmitHandler = e => {
    e.preventDefault();

    // emit message to backend
    const data = { name: value };
    socket.emit('channel add', data);

    setValue('');
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Add channel"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)} />
      </div>
    </form>
  );
};

export default ChannelForm;
