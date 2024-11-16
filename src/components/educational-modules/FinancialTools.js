// FinancialTools.js
import React from 'react';
import { Link } from 'react-router-dom';
import './FinancialTools.css';

function FinancialTools() {
  const tools = [
    {
      name: 'Budget Calculator',
      description: 'A tool to help you plan and manage your monthly income and expenses effectively.',
      link: '/budget-calculator'
    },
    {
      name: 'Savings Goal Planner',
      description: 'Set your financial goals and track your savings progress with this interactive planner.',
      link: '/savings-goal-planner'
    },
    {
      name: 'Debt Payoff Calculator',
      description: 'Calculate how long it will take to pay off your debts, based on your payments and interest rates.',
      link: '/debt-payoff-calculator'
    },
    {
      name: 'Emergency Fund Calculator',
      description: 'Calculate how much money you need to save for unexpected expenses or emergencies.',
      link: '/emergency-fund-calculator'
    },
    {
      name: 'Investment Simulator',
      description: 'Simulate different investment scenarios to understand potential returns and risks.',
      link: '/investment-simulator'
    },
    {
      name: 'Retirement Savings Calculator',
      description: 'Estimate how much you need to save to retire comfortably.',
      link: '/retirement-savings-calculator'
    },
    {
      name: 'Net Worth Tracker',
      description: 'Track your net worth by calculating your assets and liabilities.',
      link: '/net-worth-tracker'
    },
    {
      name: 'Credit Card Payoff Tool',
      description: 'Calculate how much interest you will pay and how long it will take to pay off your credit card balance.',
      link: '/credit-card-payoff-tool'
    },
    {
      name: 'Expense Tracker',
      description: 'Track your daily, weekly, and monthly expenses to understand your spending habits.',
      link: '/expense-tracker'
    },
    {
      name: 'Financial Literacy Quiz',
      description: 'Test your financial literacy knowledge with interactive quizzes on various topics.',
      link: '/financial-literacy-quiz'
    }
  ];

  return (
    <div className="financial-tools-container">
      <header className="header">
        <nav className="navbar">
          <ul className="navbar-links">
            <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
            <li><Link to="/budgeting-basics"><i className="fa fa-wallet"></i> Budgeting Basics</Link></li>
            <li><Link to="/savings-and-investments"><i className="fa fa-chart-line"></i> Savings & Investments</Link></li>
            <li><Link to="/debt-management"><i className="fa fa-hand-holding-usd"></i> Debt Management</Link></li>
            <li><Link to="/financial-tools"><i className="fa fa-tools"></i> Financial Tools</Link></li>
          </ul>
        </nav>
        <h1>Financial Tools</h1>
        <h2>Empower Yourself with These Financial Tools</h2>
      </header>

      <main className="main-content">
        <section className="tools-section">
          {tools.map((tool, index) => (
            <div key={index} className="tool-card">
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
              <Link to={tool.link} className="tool-link">Try it out</Link>
            </div>
          ))}
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 My Financial Pathways - Empowering your financial journey for the ones to come.</p>
      </footer>
    </div>
  );
}

export default FinancialTools;
