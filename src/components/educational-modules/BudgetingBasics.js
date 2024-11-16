import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BudgetingBasics.css';

function BudgetingBasics() {
  const [quizStep, setQuizStep] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const questions = [
    {
      question: 'What is budgeting?',
      options: ['Planning income and expenses', 'Spending all money', 'Ignoring income'],
      answer: 0,
    },
    {
      question: 'Why is saving important?',
      options: ['To prepare for unexpected expenses', 'To buy unnecessary things', 'To avoid budgeting'],
      answer: 0,
    },
    {
      question: 'What should be prioritized in a budget?',
      options: ['Essential expenses', 'Luxury items', 'Entertainment'],
      answer: 0,
    },
    {
      question: 'How can you reduce expenses?',
      options: ['Track spending', 'Ignore bills', 'Spend more on entertainment'],
      answer: 0,
    },
    {
      question: 'What percentage of income should ideally be saved?',
      options: ['20%', '50%', '0%'],
      answer: 0,
    },
  ];

  const handleAnswerClick = (index) => {
    if (index === questions[quizStep].answer) {
      setScore(score + 5);
    }
    setUserAnswers([...userAnswers, index]);
    setQuizStep(quizStep + 1);
  };

  return (
    <div className="budgeting-basics-container">
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
        <section className="education-section">
          <h3>What is Budgeting?</h3>
          <p>Budgeting is the process of creating a plan to spend your money wisely. This involves tracking income, planning for expenses, and setting financial goals. Saving is a crucial part of budgeting, helping you prepare for unexpected costs and reach financial independence.</p>
          <ul>
            <li>Understand your monthly income and expenses.</li>
            <li>Prioritize essential expenses like rent, bills, and food.</li>
            <li>Set a monthly savings goal to build a financial cushion.</li>
          </ul>
        </section>

        {/* Interactive Quiz Section */}
        <section className="quiz-section">
          {quizStep < questions.length ? (
            <div className="quiz-question">
              <h4>Question {quizStep + 1} of {questions.length}</h4>
              <p>{questions[quizStep].question}</p>
              {questions[quizStep].options.map((option, index) => (
                <button key={index} className="quiz-option" onClick={() => handleAnswerClick(index)}>
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="quiz-results">
              <h4>Quiz Completed!</h4>
              <p>Your Score: {score} points</p>
              <p>Great job! You've earned reward points that you can use in the Rewards Shop.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 My Financial Pathways - Empowering your financial journey for the ones to come.</p>
      </footer>
    </div>
  );
}

export default BudgetingBasics;
