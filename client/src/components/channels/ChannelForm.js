import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addChannel } from '../../store/actions';


const ChannelForm = () => {

  const [value, setValue] = useState('');

  const channelsLength = useSelector(state => state.channels.length);

  const dispatch = useDispatch();
  const onStartAddChannel = name => dispatch(addChannel({ id: channelsLength, name }));

  const onSubmitHandler = e => {
    e.preventDefault();

    onStartAddChannel(value);
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
