"use client";

import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if (email.trim() === '' || password.trim() === '') {
            setError('Both email and password are required');
            return;
        }

        setLoading(true);
        setError('');
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Successful login
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                if (error.message.includes('wrong-password')) {
                    setError('The password you entered is incorrect.');
                } else if (error.message.includes('user-not-found')) {
                    setError('No account found with this email.');
                } else {
                    setError('Login failed: ' + error.message);
                }
            });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white px-4">
            <h1 className="text-2xl mb-6">Welcome Back</h1>
            
            <label htmlFor="email" className="sr-only">Email</label>
            <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-72 p-2 mb-4 border border-white rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-required="true"
            />
            
            <label htmlFor="password" className="sr-only">Password</label>
            <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-72 p-2 mb-4 border border-white rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-required="true"
            />
            
            {error && <p className="text-red-500 mb-4">{error}</p>}
            
            <button
                onClick={handleLogin}
                disabled={loading}
                className={`w-72 p-2 rounded border border-white ${loading ? 'bg-gray-400' : 'bg-white'} text-black transition duration-300 ease-in-out transform hover:${loading ? '' : '-translate-y-1 scale-105'}`}
            >
                {loading ? 'Loading...' : 'Login'}
            </button>
            
            <div className="flex justify-between w-72 mt-4">
                <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</a>
            </div>
        </div>
    );
}


