import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  // Import the CSS file for styling

function HomePage() {
  return (
    <div className="homepage-container">
      <header className="header">
        <nav className="navbar">
          <ul className="navbar-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/budgeting-basics">Budgeting Basics</Link></li>
            <li><Link to="/savings-and-investments">Savings & Investments</Link></li>
            <li><Link to="/debt-management">Debt Management</Link></li>
            <li><Link to="/challenges">Challenges</Link></li>
            <li><Link to="/rewards-shop">Rewards Shop</Link></li>
            <li><Link to="/virtual-pet">Virtual Pet</Link></li>
            <li><Link to="/dictionary">Financial Dictionary</Link></li>
          </ul>
        </nav>
        <h1>Welcome to My Financial Pathways</h1>
        <h2>Empowering Your Financial Literacy for a Better Future</h2>
      </header>

      <main className="main-content">
        {/* Introduction Section */}
        <section className="introduction-section">
          <h3>Why Financial Literacy Matters</h3>
          <p>
            Financial literacy is the key to making informed decisions about your money, planning for the future, and achieving financial independence.
            Our platform provides you with the tools, tips, and resources you need to take control of your financial journey.
          </p>
        </section>

        {/* Key Features Section */}
        <section className="features-section">
          <h3>Features of My Financial Pathways</h3>
          <div className="features-list">
            <div className="feature-item">
              <h4>Budgeting Tools</h4>
              <p>Create and manage your budget easily, and track your spending habits.</p>
              <Link to="/budgeting-basics" className="feature-link">Learn More</Link>
            </div>
            <div className="feature-item">
              <h4>Savings & Investments</h4>
              <p>Learn how to save effectively and invest wisely for a secure future.</p>
              <Link to="/savings-and-investments" className="feature-link">Get Started</Link>
            </div>
            <div className="feature-item">
              <h4>Debt Management</h4>
              <p>Understand how to manage debt and make informed decisions to reduce it.</p>
              <Link to="/debt-management" className="feature-link">Explore Tips</Link>
            </div>
            <div className="feature-item">
              <h4>Interactive Challenges</h4>
              <p>Participate in challenges to improve your financial habits and earn rewards.</p>
              <Link to="/challenges" className="feature-link">Take a Challenge</Link>
            </div>
            <div className="feature-item">
              <h4>Rewards Shop</h4>
              <p>Earn points for learning and redeem them for virtual rewards.</p>
              <Link to="/rewards-shop" className="feature-link">Visit Rewards Shop</Link>
            </div>
            <div className="feature-item">
              <h4>Virtual Pet</h4>
              <p>Take care of your financial health by nurturing your virtual pet.</p>
              <Link to="/virtual-pet" className="feature-link">Meet Your Pet</Link>
            </div>
            <div className="feature-item">
              <h4>Financial Dictionary</h4>
              <p>Learn financial terminology to better understand the world of finance.</p>
              <Link to="/dictionary" className="feature-link">Explore the Dictionary</Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <h3>What Our Users Say</h3>
          <div className="testimonials">
            <blockquote>
              "My Financial Pathways has completely changed how I think about money. I feel more in control and prepared for my future." - <strong>Alex T.</strong>
            </blockquote>
            <blockquote>
              "The interactive challenges and virtual pet make learning about finances so much fun! I actually look forward to using this app." - <strong>Jamie R.</strong>
            </blockquote>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="call-to-action-section">
          <h3>Ready to Take Control of Your Financial Future?</h3>
          <p>Sign up today and start your journey towards financial independence!</p>
          <button className="sign-up-button">Get Started</button>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 My Financial Pathways - Empowering your financial journey for the ones to come.</p>
      </footer>
    </div>
  );
}

export default HomePage;
