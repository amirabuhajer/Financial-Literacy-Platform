import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SavingsAndInvestments.css';
import { motion } from 'framer-motion';

function SavingsAndInvestments() {
  const lessons = [
    {
      title: 'Introduction to Savings',
      url: 'https://www.youtube.com/embed/p7HKvqRI_Bo',
      description: 'Learn the importance of saving and how it can secure your financial future.'
    },
    {
      title: 'Investment Basics',
      url: 'https://www.youtube.com/embed/IIKr2915l2g',
      description: 'Understand the basics of investing and different investment options.'
    },
    {
      title: 'Compound Interest Explained',
      url: 'https://www.youtube.com/embed/AeR9tTXflfk',
      description: "Learn how compound interest works and why it's important for long-term savings."
    },
    {
      title: 'Diversifying Your Portfolio',
      url: 'https://www.youtube.com/embed/3B7xqYp7q2w',
      description: 'Understand the importance of diversification in reducing investment risk.'
    },
    {
      title: 'Setting Long-Term Financial Goals',
      url: 'https://www.youtube.com/embed/7R92sOFpFhE',
      description: 'Learn how to set achievable long-term financial goals for a secure future.'
    }
  ];

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else {
      navigate('/quiz-investment');
    }
  };

  return (
    <div className="savings-investments-container">
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
                <i className="fa fa-wallet"></i> Budgeting Basics
              </Link>
            </li>
            <li>
              <Link to="/savings-and-investments" className={location.pathname === '/savings-and-investments' ? 'active' : ''}>
                <i className="fa fa-chart-line"></i> Savings and Investments
              </Link>
            </li>
            <li>
              <Link to="/debt-management" className={location.pathname === '/debt-management' ? 'active' : ''}>
                <i className="fa fa-hand-holding-usd"></i> Debt Management
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
        <h2>Learn How to Grow Your Wealth</h2>
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

export default SavingsAndInvestments;