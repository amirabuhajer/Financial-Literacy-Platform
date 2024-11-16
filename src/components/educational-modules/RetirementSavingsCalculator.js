// RetirementSavingsCalculator.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UniversalFinancialStyles.css';

function RetirementSavingsCalculator() {
  const [currentAge, setCurrentAge] = useState(0);
  const [retirementAge, setRetirementAge] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [annualInterestRate, setAnnualInterestRate] = useState(0);
  const [futureValue, setFutureValue] = useState(null);

  const calculateRetirementSavings = () => {
    const yearsToSave = retirementAge - currentAge;
    if (yearsToSave <= 0) {
      setFutureValue(0);
      return;
    }
    const monthlyRate = parseFloat(annualInterestRate) / 100 / 12;
    const months = yearsToSave * 12;
    let total = parseFloat(currentSavings);

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
        <h1>Retirement Savings Calculator</h1>
        <h2>Estimate How Much You Need to Save for Retirement</h2>
      </header>

      <main className="main-content">
        <section className="calculator-section">
          <div className="calculator-form">
            <label htmlFor="current-age">Current Age:</label>
            <input
              type="number"
              id="current-age"
              value={currentAge}
              onChange={(e) => setCurrentAge(parseInt(e.target.value) || 0)}
              placeholder="Enter your current age"
            />

            <label htmlFor="retirement-age">Retirement Age:</label>
            <input
              type="number"
              id="retirement-age"
              value={retirementAge}
              onChange={(e) => setRetirementAge(parseInt(e.target.value) || 0)}
              placeholder="Enter your desired retirement age"
            />

            <label htmlFor="monthly-contribution">Monthly Contribution ($):</label>
            <input
              type="number"
              id="monthly-contribution"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
              placeholder="Enter your monthly contribution"
            />

            <label htmlFor="current-savings">Current Savings ($):</label>
            <input
              type="number"
              id="current-savings"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(parseFloat(e.target.value) || 0)}
              placeholder="Enter your current savings"
            />

            <label htmlFor="annual-interest-rate">Annual Interest Rate (%):</label>
            <input
              type="number"
              id="annual-interest-rate"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(parseFloat(e.target.value) || 0)}
              placeholder="Enter the annual interest rate"
            />

            <button type="button" className="button" onClick={calculateRetirementSavings}>
              Calculate Future Value
            </button>
          </div>

          {futureValue !== null && (
            <div className="result">
              <h3>Future Value of Retirement Savings</h3>
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

export default RetirementSavingsCalculator;
