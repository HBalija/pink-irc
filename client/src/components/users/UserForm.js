import React, { useState } from 'react';


const UserForm = props => {

  const [userValue, setUserValue] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    props.setUserName(userValue);
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
