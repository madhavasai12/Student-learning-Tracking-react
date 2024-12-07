import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Book, LogIn, UserPlus } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="landing-container">
      {/* Background */}
      <div className="landing-background" />

      {/* Main Content */}
      <div className="landing-box">
        <div className="icon-wrapper">
          <Book className="landing-icon" />
        </div>
        <h1 className="landing-title">Student Learning Tracker</h1>
        <p className="landing-description">
          Empower your educational journey with intelligent tracking and insights.
        </p>

        <div className="landing-buttons">
          <button 
            className="signup-btn" 
            onClick={() => navigate('/signup')} // Redirect to /signup
          >
            <UserPlus className="button-icon" />
            <span>Sign Up</span>
          </button>
          <button 
            className="signin-btn" 
            onClick={() => navigate('/signin')} // Redirect to /signin
          >
            <LogIn className="button-icon" />
            <span>Sign In</span>
          </button>
        </div>
      </div>
      {/* Footer */}
      <div className="landing-footer">
        © 2024 Student Learning Tracker. All rights reserved.
      </div>
    </div>
  );
};

export default LandingPage;
