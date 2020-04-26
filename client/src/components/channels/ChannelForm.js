import React, { useState } from 'react';
import { useSelector } from 'react-redux';


const ChannelForm = () => {

  const [value, setValue] = useState('');

  const channelsLength = useSelector(state => state.channels.length);
  const websocket = useSelector(state => state.websocket);

  const onSubmitHandler = e => {
    e.preventDefault();

    const msg = {
      name: 'channel add',
      data: {
        id: channelsLength,
        name: value
      }
    };
    websocket.send(JSON.stringify(msg));
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
