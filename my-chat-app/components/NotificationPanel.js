"use client";

import { useState, useEffect } from 'react';

const NotificationPanel = ({ notifications }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', height: '100px', overflowY: 'scroll', marginTop: '10px' }}>
      <strong>Notifications:</strong>
      {notifications.length === 0 && <div>No notifications</div>}
      {notifications.map((notif, index) => (
        <div key={index} style={{ margin: '5px 0' }}>
          {notif}
        </div>
      ))}
    </div>
  );
};

export default NotificationPanel;
