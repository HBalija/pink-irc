import React from 'react';

import UserForm from './UserForm';
import UserList from './UserList';


const UserSection = () => {
  return (
    <div className="support panel panel-primary">
      <div className="panel-heading">
        <strong>Users</strong>
      </div>
      <div className="panel-body users">
        <UserList />
        <UserForm />
      </div>
    </div>
  );
};

export default UserSection;
