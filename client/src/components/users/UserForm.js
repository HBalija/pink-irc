import React, { useState } from 'react';
import { useSelector } from 'react-redux';


const UserForm = () => {

  const [userValue, setUserValue] = useState('');

  const usersLength = useSelector(state => state.users.length);
  const socket = useSelector(state => state.socket);


  const onSubmit = e => {
    e.preventDefault();

    // emit message to backend
    const data = { id: usersLength, name: userValue };
    socket.emit('user add', data);

    setUserValue('');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          value={userValue}
          onChange={e => setUserValue(e.target.value)}
          placeholder="Set your name..." />
      </div>
    </form>
  );
};

export default UserForm;
