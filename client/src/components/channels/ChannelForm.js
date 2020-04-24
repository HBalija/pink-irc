import React, { useState } from 'react';

import '../../App.css';


const ChannelForm = ({ addChannel }) => {

  const [value, setValue] = useState('');

  const onSubmitHandler = e => {
    e.preventDefault();

    addChannel(value);
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
