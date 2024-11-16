// CreditCardPayoffCalculator.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UniversalFinancialStyles.css';

function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [monthsToPayOff, setMonthsToPayOff] = useState(null);
  const [totalInterestPaid, setTotalInterestPaid] = useState(null);

  const calculatePayoff = () => {
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const payment = parseFloat(monthlyPayment);
    let remainingBalance = parseFloat(balance);
    let totalInterest = 0;
    let months = 0;

    if (monthlyRate === 0) {
      months = Math.ceil(remainingBalance / payment);
    } else {
      while (remainingBalance > 0) {
        const interest = remainingBalance * monthlyRate;
        totalInterest += interest;
        remainingBalance = remainingBalance + interest - payment;
        months++;
        if (months > 1000) break; // Prevent infinite loop if monthlyPayment is too low
      }
    }

    setMonthsToPayOff(months);
    setTotalInterestPaid(totalInterest);
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
        <h1>Credit Card Payoff Calculator</h1>
        <h2>Calculate How Long It Will Take to Pay Off Your Credit Card Balance</h2>
      </header>

      <main className="main-content">
        <section className="calculator-section">
          <div className="calculator-form">
            <label htmlFor="balance">Credit Card Balance ($):</label>
            <input
              type="number"
              id="balance"
              value={balance}
              onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
              placeholder="Enter your credit card balance"
            />

            <label htmlFor="interest-rate">Annual Interest Rate (%):</label>
            <input
              type="number"
              id="interest-rate"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
              placeholder="Enter the annual interest rate"
            />

            <label htmlFor="monthly-payment">Monthly Payment ($):</label>
            <input
              type="number"
              id="monthly-payment"
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(parseFloat(e.target.value) || 0)}
              placeholder="Enter your monthly payment"
            />

            <button type="button" className="button" onClick={calculatePayoff}>
              Calculate Payoff Time
            </button>
          </div>

          {monthsToPayOff !== null && (
            <div className="result">
              <h3>Payoff Results</h3>
              <p>Months to Pay Off: {monthsToPayOff} month(s)</p>
              <p>Total Interest Paid: ${totalInterestPaid.toFixed(2)}</p>
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

export default CreditCardPayoffCalculator;
