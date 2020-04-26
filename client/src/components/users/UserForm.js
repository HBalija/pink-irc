import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addUser } from '../../store/actions';


const UserForm = () => {

  const [userValue, setUserValue] = useState('');

  const usersLength = useSelector(state => state.users.length);

  const dispatch = useDispatch();
  const onStartAddCUser = name => dispatch(addUser({ id: usersLength, name }));

  const onSubmit = e => {
    e.preventDefault();

    onStartAddCUser(userValue);
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
