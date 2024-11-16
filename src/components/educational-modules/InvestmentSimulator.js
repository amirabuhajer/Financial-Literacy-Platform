// InvestmentSimulator.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UniversalFinancialStyles.css';

function InvestmentSimulator() {
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [annualInterestRate, setAnnualInterestRate] = useState(0);
  const [years, setYears] = useState(0);
  const [futureValue, setFutureValue] = useState(null);

  const calculateInvestment = () => {
    const monthlyRate = parseFloat(annualInterestRate) / 100 / 12;
    const months = parseInt(years) * 12;
    let total = parseFloat(initialInvestment);

    for (let i = 0; i < months; i++) {
      total = total * (1 + monthlyRate) + parseFloat(monthlyContribution);
    }

    setFutureValue(total);
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
        <h1>Investment Simulator</h1>
        <h2>Simulate Your Investment Growth</h2>
      </header>

      <main className="main-content">
        <section className="calculator-section">
          <div className="calculator-form">
            <label htmlFor="initial-investment">Initial Investment ($):</label>
            <input
              type="number"
              id="initial-investment"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(parseFloat(e.target.value) || 0)}
              placeholder="Enter your initial investment"
            />

            <label htmlFor="monthly-contribution">Monthly Contribution ($):</label>
            <input
              type="number"
              id="monthly-contribution"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
              placeholder="Enter your monthly contribution"
            />

            <label htmlFor="annual-interest-rate">Annual Interest Rate (%):</label>
            <input
              type="number"
              id="annual-interest-rate"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(parseFloat(e.target.value) || 0)}
              placeholder="Enter the annual interest rate"
            />

            <label htmlFor="years">Number of Years:</label>
            <input
              type="number"
              id="years"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value) || 0)}
              placeholder="Enter the number of years"
            />

            <button type="button" className="button" onClick={calculateInvestment}>
              Calculate Future Value
            </button>
          </div>

          {futureValue !== null && (
            <div className="result">
              <h3>Future Value of Investment</h3>
              <p>${futureValue.toFixed(2)}</p>
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

export default InvestmentSimulator;
