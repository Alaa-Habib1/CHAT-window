import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import styles from './ChatWindow.module.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null); // To auto-scroll to the bottom

  // Scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch messages from Firestore in real-time
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
      scrollToBottom();  // Scroll to the bottom when messages are fetched
    }, (error) => {
      console.error("Error fetching messages:", error);
      setError("Failed to load messages.");
    });

    return () => unsubscribe();
  }, []);

  // Send new message
  const handleSend = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        userId: auth.currentUser?.uid ?? 'Anonymous',
        username: auth.currentUser?.displayName ?? 'Anonymous', // Get user's display name
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
      scrollToBottom();  // Scroll after sending a message
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message.");
    }
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.messagesContainer}>
        {loading && <p>Loading messages...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {messages.map((message) => (
          <div key={message.id} className={`${styles.message} ${message.userId === auth.currentUser?.uid ? styles.sent : styles.received}`}>
            <p className={styles.username}>{message.username || 'Anonymous'}</p>
            <p>{message.text}</p>
            <span className={styles.timestamp}>
              {new Date(message.timestamp?.seconds * 1000).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className={styles.form} onSubmit={handleSend}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;

  