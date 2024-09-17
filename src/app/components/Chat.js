import { useState, useEffect } from 'react';
import { db } from '../../firebase';

import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function Chat({ selectedUser }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await addDoc(collection(db, 'messages'), {
        text: message,
        timestamp: new Date(),
        sender: 'currentUser' // Adjust this based on the current user
      });
      setMessage('');
    }
  };

  return (
    <div>
      <div className="chat-messages flex-grow overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <p className="bg-blue-100 p-2 rounded-lg inline-block">
              {msg.text}
            </p>
            <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 rounded-lg"
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg mt-2">
          Send
        </button>
      </form>
    </div>
  );
}


