// frontend/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.jpg';

function Home() {
  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <h1 className="logo">BoilerMate</h1>
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
            <img src={image1} alt="Roommate Matching" />
          </div>
          <div className="text-content">
            <h2>What is BoilerMate?</h2>
            <p>
              BoilerMate is a smart platform built to help college students find the
              perfect roommate. By considering lifestyle preferences, study habits,
              and personal interests, BoilerMate suggests matches that are more than
              random — they’re designed to help you live and thrive with the right person.
            </p>
          </div>
        </section>

        {/* Section 2 - Text Left, Image Right */}
        <section className="features-section">
          <div className="text-content">
            <h2>Why choose BoilerMate?</h2>
            <ul>
              <li><strong>Better Compatibility:</strong> Match with roommates who share similar daily routines and values.</li>
              <li><strong>Save Time:</strong> Skip the stress of searching — our system narrows down the best options for you.</li>
              <li><strong>Campus-Focused:</strong> Designed specifically for college students, with your needs in mind.</li>
              <li><strong>Stronger Connections:</strong> Build friendships that extend beyond just sharing a room.</li>
            </ul>

            <h2>About the Founders</h2>
            <p>
              BoilerMate was created by a team of students who experienced firsthand
              the challenges of finding a good roommate. Our mission is to make college
              life smoother by helping students start off with the right living
              environment, boosting both comfort and academic success.
            </p>
          </div>
          <div className="image-placeholder right">
            <img src={image2} alt="Student Community" />
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Ready to find your match?</h2>
          <Link to="/signup" className="nav-button primary large-button">Get Started</Link>
          <p className="login-hint">Already have an account? <Link to="/login">Log In</Link></p>
        </section>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2025 BoilerMate. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
