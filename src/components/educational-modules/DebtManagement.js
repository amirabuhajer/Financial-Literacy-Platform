// DebtManagement.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DebtManagement.css';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function DebtManagement() {
  const location = useLocation();
  const lessons = [
    {
      title: 'Introduction to Debt Management',
      url: 'https://www.youtube.com/embed/xRYq6H_T9bE',
      description: 'Learn the basics of managing debt and effective strategies for reducing it.'
    },
    {
      title: 'Understanding Interest Rates',
      url: 'https://www.youtube.com/embed/akKk8o8ssn8',
      description: 'Understand how interest rates impact your debt and how to minimize interest costs.'
    },
    {
      title: 'Debt Consolidation Explained',
      url: 'https://www.youtube.com/embed/5cpIzBJIyVg',
      description: 'Learn about debt consolidation and how it can help simplify and reduce your debt.'
    },
    {
      title: 'Creating a Debt Repayment Plan',
      url: 'https://www.youtube.com/embed/eKLDez1wGds',
      description: 'Learn how to create an effective debt repayment plan that works for you.'
    },
    {
      title: 'Staying Out of Debt',
      url: 'https://www.youtube.com/embed/O91DT1pR1ew',
      description: 'Tips on staying out of debt and maintaining financial freedom.'
    }
  ];

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else {
      navigate('/quiz-debt');
    }
  };

  return (
    <div className="debt-management-container">
      <header className="header">
      <nav className="navbar">
          <ul className="navbar-links">
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
            <li>
              <Link to="/budgeting-basics" className={location.pathname === '/budgeting-basics' ? 'active' : ''}>
                <i className="fa fa-wallet"></i> budgeting-basics
              </Link>
            </li>
            <li>
              <Link to="/avings-and-investments" className={location.pathname === '/savings-and-investments' ? 'active' : ''}>
                <i className="fa fa-chart-line"></i> avings-and-investments
              </Link>
            </li>
            <li>
              <Link to="/debt-management" className={location.pathname === '/debt-management' ? 'active' : ''}>
                <i className="fa fa-hand-holding-usd"></i> debt-management
              </Link>
            </li>
            <li>
              <Link to="/rewards-shop" className={location.pathname === '/rewards-shop' ? 'active' : ''}>
                <i className="fas fa-store"></i> Rewards Shop
              </Link>
            </li>
            <li>
              <Link to="/challenges" className={location.pathname === '/challenges' ? 'active' : ''}>
                <i className="fas fa-tasks"></i> Challenges
              </Link>
            </li>
          </ul>
        </nav>
        <h1>{lessons[currentLessonIndex].title}</h1>
        <h2>Learn How to Manage and Reduce Your Debt Effectively</h2>
      </header>

      <main className="main-content">
        <section className="instructional-video">
          <div className="video-content">
            <h3>{lessons[currentLessonIndex].title}</h3>
            <div className="video-wrapper">
              <iframe
                src={lessons[currentLessonIndex].url}
                title={lessons[currentLessonIndex].title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-player"
              ></iframe>
            </div>
            <p>{lessons[currentLessonIndex].description}</p>
          </div>
          <motion.button
            className="next-button"
            onClick={handleNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentLessonIndex === lessons.length - 1 ? 'Take the Quiz' : 'Next Lesson'}
          </motion.button>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 My Financial Pathways - Empowering your financial journey for the ones to come.</p>
      </footer>
    </div>
  );
}

export default DebtManagement;