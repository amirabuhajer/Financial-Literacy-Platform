import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BudgetingBasics.css';
import { motion } from 'framer-motion';

function BudgetingBasics() {
  const lessons = [
    {
      title: 'Introduction to Budgeting',
      url: 'https://www.youtube.com/embed/OoZRt1S6vZI',
      description: 'Learn the basics of budgeting and why it is important for your financial health.'
    },
    {
      title: 'Importance of Saving',
      url: 'https://www.youtube.com/embed/3zo1Pu9TZiE',
      description: 'Understand the importance of saving and how it helps you prepare for unexpected expenses.'
    },
    {
      title: 'Prioritizing Your Expenses',
      url: 'https://www.youtube.com/embed/2RRpGlU6u5Y',
      description: 'Learn how to prioritize essential expenses and manage your income effectively.'
    },
    {
      title: 'Tracking Your Spending',
      url: 'https://www.youtube.com/embed/l8P3jAWUpoE',
      description: 'Understand the importance of tracking your expenses to achieve financial stability.'
    },
    {
      title: 'Setting a Savings Goal',
      url: 'https://www.youtube.com/embed/HD1mBvv8iCY',
      description: 'Learn how to set realistic savings goals to build a financial cushion.'
    }
  ];

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else {
      navigate('/quiz');
    }
  };

  return (
    <div className="budgeting-basics">
      <header className="header">
        <nav className="navbar">
          <ul className="navbar-links">
            <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
            <li><Link to="/budgeting-basics"><i className="fa fa-wallet"></i> Budgeting Basics</Link></li>
            <li><Link to="/savings-and-investments"><i className="fa fa-chart-line"></i> Savings & Investments</Link></li>
            <li><Link to="/debt-management"><i className="fa fa-hand-holding-usd"></i> Debt Management</Link></li>
            <li><Link to="/challenges"><i className="fa fa-tasks"></i> Challenges</Link></li>
            <li><Link to="/rewards-shop"><i className="fa fa-star"></i> Rewards Shop</Link></li>
            <li><Link to="/virtual-pet"><i className="fa fa-paw"></i> Virtual Pet</Link></li>
            <li><Link to="/dictionary"><i className="fa fa-book"></i> Financial Dictionary</Link></li>
          </ul>
        </nav>
        <h1>{lessons[currentLessonIndex].title}</h1>
        <h2>Learn how to effectively manage your income and expenses</h2>
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

export default BudgetingBasics;
