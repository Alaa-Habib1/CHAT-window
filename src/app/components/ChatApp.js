import ChatSidebar from './ChatSidebar';
import Chat from './Chat';
import { useState } from 'react';

export default function ChatApp() {
  const [selectedUser, setSelectedUser] = useState('Campbell'); // Default selected user

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <ChatSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />

      {/* Chat Component */}
      <div className="w-3/4 p-4">
        <Chat selectedUser={selectedUser} />
      </div>
    </div>
  );
}

