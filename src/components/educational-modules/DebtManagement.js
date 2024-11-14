// DebtManagement.js
import React, { useState } from 'react';
import './DebtManagement.css';

function DebtManagement() {
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
    <div className="debt-management-container">
      <header className="header">
        <h1>Debt Management</h1>
        <h2>Learn How to Manage and Reduce Your Debt Effectively</h2>
      </header>

      <main className="main-content">
        <section className="introduction-section">
          <h3>Introduction to Debt Management</h3>
          <p>Managing debt can feel overwhelming, but with the right plan, you can reduce your debt effectively. This tool will help you estimate the time needed to pay off your debt, considering your interest rate and monthly payment.</p>
        </section>

        <section className="debt-calculator-section">
          <h4>Debt Payoff Calculator</h4>
          <form className="debt-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="debt-amount">Total Debt Amount ($):</label>
            <input
              type="number"
              id="debt-amount"
              value={debtAmount}
              onChange={(e) => setDebtAmount(e.target.value)}
            />

            <label htmlFor="monthly-payment">Monthly Payment ($):</label>
            <input
              type="number"
              id="monthly-payment"
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(e.target.value)}
            />

            <label htmlFor="interest-rate">Interest Rate (%):</label>
            <input
              type="number"
              id="interest-rate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />

            <button type="button" onClick={calculateDebtPayoff} className="calculate-debt-button">
              Calculate Payoff Time
            </button>
          </form>

          {monthsToPayOff !== null && (
            <p className="payoff-result">
              Based on your inputs, it will take approximately {monthsToPayOff} months to pay off your debt.
            </p>
          )}
        </section>

        <section className="tips-section">
          <h4>Tips to Manage Your Debt</h4>
          <ul>
            <li>Focus on paying off high-interest debt first to save money on interest payments.</li>
            <li>Consider debt consolidation if you have multiple debts with high interest rates.</li>
            <li>Maintain a budget to keep track of your expenses and ensure you make timely debt payments.</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 My Financial Pathways - Empowering your financial journey for the ones to come.</p>
      </footer>
    </div>
  );
}

export default DebtManagement;