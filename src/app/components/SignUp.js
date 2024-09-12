import { useState } from 'react';
import { auth } from '../../firebase'; // Import the Firebase auth object
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User signed up successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ color: '#fff' }}>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '2px solid #fff', backgroundColor: '#000', color: '#fff' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '2px solid #fff', backgroundColor: '#000', color: '#fff' }}
      />
      <button
        onClick={handleSignUp}
        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '2px solid #fff', backgroundColor: '#fff', color: '#000', fontWeight: 'bold' }}
      >
        Sign Up
      </button>
    </div>
  );
}
