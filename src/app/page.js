"use client";

import ChatWindow from './components/ChatWindow';  // Import the styled ChatWindow component

const HomePage = () => {
  return (
    <div>
      <h1>Chat</h1>  {/* Updated title */}
      <ChatWindow />
    </div>
  );
};

export default HomePage;

