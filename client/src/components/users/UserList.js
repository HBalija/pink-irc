import React from 'react';

import User from './User';

const UserList = props => {
  return (
    <ul>
      {props.users.map(user => <User key={user.id} userName={user.name} />)}
    </ul>
  );
};

export default UserList;
