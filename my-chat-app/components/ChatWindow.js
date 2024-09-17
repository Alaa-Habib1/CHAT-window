"use client";

import { useState, useEffect } from 'react';

const ChatWindow = ({ messages }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll' }}>
      {messages.map((msg, index) => (
        <div key={index} style={{ margin: '5px 0' }}>
          <strong>{msg.user}: </strong>{msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
