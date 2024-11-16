// DebtPayoffCalculator.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UniversalFinancialStyles.css';

function DebtPayoffCalculator() {
  const [debtAmount, setDebtAmount] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [monthsToPayOff, setMonthsToPayOff] = useState(null);

  const calculateDebtPayoff = () => {
    const rate = parseFloat(interestRate) / 100 / 12;
    const payment = parseFloat(monthlyPayment);
    const debt = parseFloat(debtAmount);

    if (rate === 0) {
      setMonthsToPayOff(debt / payment);
    } else {
      const months = Math.log(payment / (payment - rate * debt)) / Math.log(1 + rate);
      setMonthsToPayOff(Math.ceil(months));
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
        <h1>Debt Payoff Calculator</h1>
        <h2>Calculate How Long It Will Take to Pay Off Your Debt</h2>
      </header>

      <main className="main-content">
        <section className="calculator-section">
          <div className="calculator-form">
            <label htmlFor="debt-amount">Total Debt Amount ($):</label>
            <input
              type="number"
              id="debt-amount"
              value={debtAmount}
              onChange={(e) => setDebtAmount(parseFloat(e.target.value) || 0)}
              placeholder="Enter your total debt amount"
            />

            <label htmlFor="monthly-payment">Monthly Payment ($):</label>
            <input
              type="number"
              id="monthly-payment"
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(parseFloat(e.target.value) || 0)}
              placeholder="Enter your monthly payment"
            />

            <label htmlFor="interest-rate">Interest Rate (% per year):</label>
            <input
              type="number"
              id="interest-rate"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
              placeholder="Enter the interest rate"
            />

            <button type="button" className="button" onClick={calculateDebtPayoff}>
              Calculate Payoff Time
            </button>
          </div>

          {monthsToPayOff !== null && (
            <div className="result">
              <h3>Months to Pay Off Debt</h3>
              <p>{monthsToPayOff} month(s)</p>
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

export default DebtPayoffCalculator;
