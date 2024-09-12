"use client";

import { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, setDoc, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        const q = query(collection(db, 'chats', 'chatRoomId', 'messages'), orderBy('timestamp', 'asc'));
        const unsubscribeMessages = onSnapshot(q, (querySnapshot) => {
            const msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push({ id: doc.id, ...doc.data() });
            });
            setMessages(msgs);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeMessages();
        };
    }, []);

    const handleTyping = (e) => {
        setMessage(e.target.value);
        setTyping(true);
        const typingDocRef = doc(db, "chats", "chatRoomId", "typing", user.uid);
        setDoc(typingDocRef, { typing: true });
        
        const typingTimeout = setTimeout(() => {
            setTyping(false);
            deleteDoc(typingDocRef);
        }, 2000);

        return () => clearTimeout(typingTimeout);
    };

    const sendMessage = async () => {
        if (message.trim() === '') return;

        await addDoc(collection(db, 'chats', 'chatRoomId', 'messages'), {
            text: message,
            userId: user.uid,
            username: user.email,
            timestamp: serverTimestamp(),
        });
        setMessage('');
        setTyping(false);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            <div className="flex-1 p-4 overflow-auto">
                {messages.map(msg => (
                    <div key={msg.id} className={`mb-2 p-2 rounded ${msg.userId === user?.uid ? 'bg-blue-500 self-end' : 'bg-gray-700 self-start'}`}>
                        <div><strong>{msg.username}</strong></div>
                        <div>{msg.text}</div>
                        <div className="text-xs text-gray-400">{new Date(msg.timestamp?.toDate()).toLocaleTimeString()}</div>
                    </div>
                ))}
            </div>
            <div className="p-4 bg-gray-800">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={handleTyping}
                    className="w-full p-2 rounded text-black"
                />
                <button
                    onClick={sendMessage}
                    className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
                >
                    Send
                </button>
                {typing && <p className="text-gray-400">Typing...</p>}
            </div>
        </div>
    );
}

