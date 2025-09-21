// frontend/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you'll use react-router-dom for navigation
import '../App.css'; // Import the main CSS file for styling

function Home() {
  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <nav className="header-nav">
          <Link to="/login" className="nav-button">Login</Link>
          <Link to="/signup" className="nav-button primary">Sign Up</Link>
        </nav>
      </header>

      {/* Main Content Sections */}
      <main className="home-main-content">
        <section className="hero-section">
          <div className="text-content">
            <h1>What is FriendMe?</h1>
            <p>
              FriendMe is your new social hub designed to connect you with like-minded individuals.
              Discover new friends, groups, and activities that match your passions and interests.
              Whether you're looking for study partners, sports teammates, or simply new people
              to share experiences with, FriendMe makes it easy and fun.
            </p>
          </div>
          <div className="image-placeholder">
            {/* Placeholder for an image related to "What is FriendMe?" */}
            <p>Visual for Connection</p>
          </div>
        </section>

        <section className="features-section">
          <div className="image-placeholder">
            {/* Placeholder for an image related to benefits/founders */}
            <p>Visual for Community/Team</p>
          </div>
          <div className="text-content">
            <h2>Why do you need FriendMe?</h2>
            <ul>
              <li>*Find Your Tribe:* Easily connect with people who share your hobbies and goals.</li>
              <li>*Expand Your Network:* Meet new friends beyond your immediate circles.</li>
              <li>*Discover Events:* Get involved in local activities and groups tailored to you.</li>
              <li>*Build Stronger Bonds:* Foster meaningful relationships with ease.</li>
            </ul>

            <h2>About the Founders</h2>
            <p>
              FriendMe was founded by a passionate team of social enthusiasts who believe
              in the power of genuine connection. Our mission is to break down social barriers
              and help everyone find their community.
            </p>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to connect?</h2>
          <Link to="/login" className="nav-button primary large-button">Start Now!</Link>
          <p className="login-hint">Already have an account? <Link to="/login">Log In</Link></p>
        </section>
      </main>

      {/* Optional: Footer */}
      <footer className="home-footer">
        <p>&copy; 2023 FriendMe. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;