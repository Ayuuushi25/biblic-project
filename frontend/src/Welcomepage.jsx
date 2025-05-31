
// src/WelcomePage.jsx
import React from 'react';
import './Loginpage.css';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src="/bot1.png" alt="Buddy Bot" className="login-bot" />
          <h2>Welcome to <span>Bot!</span></h2>
          <p>You have successfully signed in 🎉</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}


