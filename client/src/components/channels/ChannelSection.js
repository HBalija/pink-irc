import React from 'react';

import ChannelForm from './ChannelForm';
import ChannelList from './ChannelList';

import '../../App.css';


const ChannelSection = () => {
  return (
    <div className="support panel panel-primary">
      <div className="panel-heading">
        <strong>Channels</strong>
      </div>
      <div className="panel-body channels">
        <ChannelList />
        <ChannelForm />
      </div>
    </div>
  );
};

export default ChannelSection;
