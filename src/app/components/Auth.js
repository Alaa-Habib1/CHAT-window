import { useState } from 'react';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login and Sign-Up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login:', { email, password });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle sign-up logic
    console.log('Sign Up:', { firstName, lastName, email, password });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border-2 border-black">
        <h2 className="text-3xl font-bold text-center mb-8">
          {isSignUp ? 'Sign Up' : 'Login'}
        </h2>
        <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-6">
          {isSignUp && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-200 text-black border-2 border-black"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-200 text-black border-2 border-black"
                required
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-200 text-black border-2 border-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-200 text-black border-2 border-black"
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-black text-white font-bold rounded-lg"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isSignUp ? 'Already have an account? ' : "Don’t have an account? "}
            <a
              href="#"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-black font-bold"
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}




