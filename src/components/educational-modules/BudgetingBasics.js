import React from 'react';
import { Link } from 'react-router-dom';
import './BudgetingBasics.css';

function BudgetingBasics() {
  const videos = [
    {
      title: 'Introduction to Budgeting',
      url: 'https://example.com/video1.mp4',
      description: 'Learn the basics of budgeting and why it is important for your financial health.'
    },
    {
      title: 'Importance of Saving',
      url: 'https://example.com/video2.mp4',
      description: 'Understand the importance of saving and how it helps you prepare for unexpected expenses.'
    },
    {
      title: 'Prioritizing Your Expenses',
      url: 'https://example.com/video3.mp4',
      description: 'Learn how to prioritize essential expenses and manage your income more effectively.'
    },
    {
      title: 'Tracking Your Spending',
      url: 'https://example.com/video4.mp4',
      description: 'Understand the importance of tracking your expenses to achieve financial stability.'
    },
    {
      title: 'Setting a Savings Goal',
      url: 'https://example.com/video5.mp4',
      description: 'Learn how to set realistic savings goals to build a financial cushion.'
    }
  ];

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
        <h1>Budgeting Basics</h1>
        <h2>Learn how to effectively manage your income and expenses</h2>
      </header>


      <main className="main-content">
        {videos.map((video, videoIndex) => (
          <section key={videoIndex} className="instructional-video">
            <div className="video-content">
              <h3>{video.title}</h3>
              <div className="video-wrapper">
                <video src={video.url} controls className="video-player" />
              </div>
              <p>{video.description}</p>
            </div>
            <div className="quiz-button-section">
              <Link to="/quiz">
                <button className="quiz-button">Take the Quiz</button>
              </Link>
            </div>
          </section>
        ))}
      </main>

      <footer className="footer">
        <p>© 2024 My Financial Pathways - Empowering your financial journey for the ones to come.</p>
      </footer>
    </div>
  );
}

export default BudgetingBasics;
