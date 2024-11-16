// SavingsGoalPlanner.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UniversalFinancialStyles.css';

function SavingsGoalPlanner() {
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [monthsToReachGoal, setMonthsToReachGoal] = useState(null);

  const calculateGoal = () => {
    if (goalAmount > 0 && monthlyContribution > 0) {
      const months = Math.ceil(goalAmount / monthlyContribution);
      setMonthsToReachGoal(months);
    } else {
      setMonthsToReachGoal(null);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <nav className="navbar">
          <ul className="navbar-links">
            <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
            <li><Link to="/budgeting-basics"><i className="fa fa-wallet"></i> Budgeting Basics</Link></li>
            <li><Link to="/financial-tools"><i className="fa fa-tools"></i> Financial Tools</Link></li>
          </ul>
        </nav>
        <h1>Savings Goal Planner</h1>
        <h2>Set and Track Your Financial Goals</h2>
      </header>

      <main className="main-content">
        <section className="calculator-section">
          <div className="calculator-form">
            <label htmlFor="goal-name">Goal Name:</label>
            <input
              type="text"
              id="goal-name"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="Enter your savings goal name"
            />

            <label htmlFor="goal-amount">Goal Amount ($):</label>
            <input
              type="number"
              id="goal-amount"
              value={goalAmount}
              onChange={(e) => setGoalAmount(parseFloat(e.target.value) || 0)}
              placeholder="Enter the goal amount"
            />

            <label htmlFor="monthly-contribution">Monthly Contribution ($):</label>
            <input
              type="number"
              id="monthly-contribution"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
              placeholder="Enter your monthly contribution"
            />

            <button type="button" className="button" onClick={calculateGoal}>
              Calculate Months to Reach Goal
            </button>
          </div>

          {monthsToReachGoal !== null && (
            <div className="result">
              <h3>Months to Reach Goal</h3>
              <p>{monthsToReachGoal} month(s)</p>
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

export default SavingsGoalPlanner;
