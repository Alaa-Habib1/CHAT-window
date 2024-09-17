"use client";

import { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div style={{ display: 'flex', marginTop: '10px' }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ flex: 1, padding: '10px' }}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage} style={{ padding: '10px' }}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;
