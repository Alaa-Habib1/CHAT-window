"use client";

import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Chat from '../app/components/Chat';  // Updated path
import Auth from '../app/components/Auth';  // Updated path

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold mt-8">Chat</h1>
      <div className="mt-8">
        {user ? (
          <>
            <Chat />
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-600 text-white p-3 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <Auth />
        )}
      </div>
    </div>
  );
}




