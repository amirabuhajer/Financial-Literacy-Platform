import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { FaPiggyBank, FaChartLine, FaBook } from 'react-icons/fa';

function HomePage() {
  return (
    <div className="homepage-container">
      <header className="header">
        <nav className="navbar">
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/learning-hub">Learning Hub</Link></li>
            <li><Link to="/challenges">Challenges</Link></li>
            <li><Link to="/rewards-shop">Rewards Shop</Link></li>
            <li><Link to="/virtual-pet">Virtual Pet</Link></li>
            <li><Link to="/dictionary">Financial Dictionary</Link></li>
          </ul>
        </nav>
        <h1>My Financial Pathways</h1>
        <h2>Take the First Step Toward Financial Confidence Today</h2>
      </header>

      <main className="main-content">
        {/* Introduction Section */}
        <section className="introduction-section">
          <h2>Welcome to Your Personalized Financial Education Platform</h2>
          <p>Our goal is to equip you with the essential knowledge and practical tools needed to take control of your financial future. Start exploring today and build a strong financial foundation.</p>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="features-list">
            <div className="feature-item">
              <FaPiggyBank size={50} color="#1E90FF" />
              <h3>Budgeting Basics</h3>
              <p>Master the art of budgeting and learn how to manage your finances effectively.</p>
              <Link to="/budgeting-basics" className="feature-link">Learn More</Link>
            </div>
            <div className="feature-item">
              <FaChartLine size={50} color="#1E90FF" />
              <h3>Savings & Investments</h3>
              <p>Discover the power of saving and investing to grow your wealth over time.</p>
              <Link to="/savings-and-investments" className="feature-link">Learn More</Link>
            </div>
            <div className="feature-item">
              <FaBook size={50} color="#1E90FF" />
              <h3>Debt Management</h3>
              <p>Understand how to manage debt effectively and regain control of your finances.</p>
              <Link to="/debt-management" className="feature-link">Learn More</Link>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="call-to-action-section">
          <h3>Ready to Take Charge of Your Financial Well-being?</h3>
          <p>Join us today and start making informed, confident decisions about your finances. Together, we’ll simplify your financial journey, one step at a time.</p>
          <button className="sign-up-button">Sign Up Now</button>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 My Financial Pathways - Empowering your financial journey for the ones to come.</p>
      </footer>
    </div>
  );
}

export default HomePage;
