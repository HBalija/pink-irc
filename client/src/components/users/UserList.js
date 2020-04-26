import React from 'react';
import { useSelector } from 'react-redux';

import User from './User';


const UserList = () => {

  const users = useSelector(state => state.users);

  return (
    <ul>
      {users.map(user => <User key={user.id} userName={user.name} />)}
    </ul>
  );
};

export default UserList;
