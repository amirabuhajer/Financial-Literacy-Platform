// EmergencyFundCalculator.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UniversalFinancialStyles.css';

function EmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [monthsToSaveFor, setMonthsToSaveFor] = useState(0);
  const [emergencyFund, setEmergencyFund] = useState(null);

  const calculateEmergencyFund = () => {
    if (monthlyExpenses > 0 && monthsToSaveFor > 0) {
      const totalFund = monthlyExpenses * monthsToSaveFor;
      setEmergencyFund(totalFund);
    } else {
      setEmergencyFund(null);
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
        <h1>Emergency Fund Calculator</h1>
        <h2>Calculate How Much You Need for Emergencies</h2>
      </header>

      <main className="main-content">
        <section className="calculator-section">
          <div className="calculator-form">
            <label htmlFor="monthly-expenses">Monthly Expenses ($):</label>
            <input
              type="number"
              id="monthly-expenses"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(parseFloat(e.target.value) || 0)}
              placeholder="Enter your monthly expenses"
            />

            <label htmlFor="months-to-save">Months to Save For:</label>
            <input
              type="number"
              id="months-to-save"
              value={monthsToSaveFor}
              onChange={(e) => setMonthsToSaveFor(parseInt(e.target.value) || 0)}
              placeholder="Enter the number of months to save for"
            />

            <button type="button" className="button" onClick={calculateEmergencyFund}>
              Calculate Emergency Fund
            </button>
          </div>

          {emergencyFund !== null && (
            <div className="result">
              <h3>Total Emergency Fund Needed</h3>
              <p>${emergencyFund.toFixed(2)}</p>
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

export default EmergencyFundCalculator;
