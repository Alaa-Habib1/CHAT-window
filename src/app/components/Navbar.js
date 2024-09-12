import { useState } from 'react';
import SignUp from './SignUp';
import Login from './Login';

export default function Navbar() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#000', borderBottom: '1px solid #fff' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>Flowerwork</div>
        <div>
          <button
            onClick={() => setShowSignUp(true)}
            style={{ padding: '8px 16px', fontSize: '16px', borderRadius: '4px', border: '1px solid #fff', backgroundColor: '#000', color: '#fff', cursor: 'pointer', marginRight: '10px' }}
          >
            Sign Up
          </button>
          <button
            onClick={() => setShowLogin(true)}
            style={{ padding: '8px 16px', fontSize: '16px', borderRadius: '4px', border: '1px solid #fff', backgroundColor: '#000', color: '#fff', cursor: 'pointer' }}
          >
            Login
          </button>
        </div>
      </nav>

      {showSignUp && <SignUp />}
      {showLogin && <Login />}
    </>
  );
}




