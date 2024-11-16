// ExpenseTracker.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UniversalFinancialStyles.css';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const handleAddExpense = () => {
    if (expenseName && expenseAmount > 0) {
      const newExpense = { name: expenseName, amount: parseFloat(expenseAmount) };
      setExpenses([...expenses, newExpense]);
      setTotalExpenses(totalExpenses + parseFloat(expenseAmount));
      setExpenseName('');
      setExpenseAmount(0);
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
        <h1>Expense Tracker</h1>
        <h2>Track Your Daily, Weekly, and Monthly Expenses</h2>
      </header>

      <main className="main-content">
        <section className="calculator-section">
          <div className="calculator-form">
            <label htmlFor="expense-name">Expense Name:</label>
            <input
              type="text"
              id="expense-name"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              placeholder="Enter expense name"
            />

            <label htmlFor="expense-amount">Expense Amount ($):</label>
            <input
              type="number"
              id="expense-amount"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(parseFloat(e.target.value) || 0)}
              placeholder="Enter expense amount"
            />

            <button type="button" className="button" onClick={handleAddExpense}>
              Add Expense
            </button>
          </div>

          <div className="expense-list">
            <h3>Expenses</h3>
            <ul>
              {expenses.map((expense, index) => (
                <li key={index} className="card">
                  {expense.name}: ${expense.amount.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>

          <div className="total-expenses">
            <h3>Total Expenses</h3>
            <p>${totalExpenses.toFixed(2)}</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 My Financial Pathways - Empowering your financial journey for the ones to come.</p>
      </footer>
    </div>
  );
}

export default ExpenseTracker;
