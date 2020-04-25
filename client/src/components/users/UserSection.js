import React from 'react';

import UserForm from './UserForm';
import UserList from './UserList';


const UserSection = props => {
  return (
    <div className="support panel panel-primary">
      <div className="panel-heading">
        <strong>Ussers</strong>
      </div>
      <div className="panel-body users">
        <UserList {...props} />
        <UserForm {...props} />
      </div>
    </div>
  );
};

export default UserSection;
