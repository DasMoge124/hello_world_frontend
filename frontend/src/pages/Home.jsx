// frontend/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <h1 className="logo">FriendMe</h1>
        <nav className="header-nav">
          <Link to="/login" className="nav-button">Login</Link>
          <Link to="/signup" className="nav-button primary">Sign Up</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="home-main-content">
        {/* Section 1 - Image Left, Text Right */}
        <section className="hero-section">
          <div className="image-placeholder left">
            <img src="/images/connection.png" alt="Connection" />
          </div>
          <div className="text-content">
            <h2>What is FriendMe?</h2>
            <p>
              FriendMe is your new social hub designed to connect you with like-minded individuals.
              Discover new friends, groups, and activities that match your passions and interests.
              Whether you're looking for study partners, sports teammates, or simply new people
              to share experiences with, FriendMe makes it easy and fun.
            </p>
          </div>
        </section>

        {/* Section 2 - Text Left, Image Right */}
        <section className="features-section">
          <div className="text-content">
            <h2>Why do you need FriendMe?</h2>
            <ul>
              <li><strong>Find Your Tribe:</strong> Easily connect with people who share your hobbies and goals.</li>
              <li><strong>Expand Your Network:</strong> Meet new friends beyond your immediate circles.</li>
              <li><strong>Discover Events:</strong> Get involved in local activities and groups tailored to you.</li>
              <li><strong>Build Stronger Bonds:</strong> Foster meaningful relationships with ease.</li>
            </ul>

            <h2>About the Founders</h2>
            <p>
              FriendMe was founded by a passionate team of social enthusiasts who believe
              in the power of genuine connection. Our mission is to break down social barriers
              and help everyone find their community.
            </p>
          </div>
          <div className="image-placeholder right">
            <img src="/images/community.png" alt="Community" />
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Ready to connect?</h2>
          <Link to="/login" className="nav-button primary large-button">Start Now!</Link>
          <p className="login-hint">Already have an account? <Link to="/login">Log In</Link></p>
        </section>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2025 FriendMe. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
