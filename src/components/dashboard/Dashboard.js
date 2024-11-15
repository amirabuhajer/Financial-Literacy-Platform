import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [income, setIncome] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseEmotion, setExpenseEmotion] = useState('');
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const expenseTotal = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpenses(expenseTotal);
    setRemainingBalance(income - expenseTotal);

    if (expenseTotal > income) {
      setAlertMessage('ALERT: Your expenses exceed your income! Consider reducing discretionary spending.');
    } else if (expenseTotal > savingsGoal) {
      setAlertMessage('ALERT: You have spent more than your savings goal. Review your expenses.');
    } else {
      setAlertMessage('');
    }
  }, [income, savingsGoal, expenses]);

  const handleAddExpense = () => {
    if (expenseCategory && expenseAmount > 0 && expenseDate && expenseEmotion) {
      setExpenses([...expenses, { category: expenseCategory, amount: expenseAmount, date: expenseDate, emotion: expenseEmotion }]);
      setExpenseCategory('');
      setExpenseAmount(0);
      setExpenseDate('');
      setExpenseEmotion('');
    }
  };

  const expenseData = {
    labels: expenses.map((expense) => expense.category),
    datasets: [
      {
        data: expenses.map((expense) => expense.amount),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  return (
    <div className="financial-pathways-container">
      <header className="header">
        <nav className="navbar">
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/budgeting-basics">Budgeting Basics</Link></li>
            <li><Link to="/savings-and-investments">Savings & Investments</Link></li>
            <li><Link to="/debt-management">Debt Management</Link></li>
            <li><Link to="/challenges">Challenges</Link></li>
            <li><Link to="/rewards-shop">Rewards Shop</Link></li>
            <li><Link to="/virtual-pet">Virtual Pet</Link></li>
            <li><Link to="/dictionary">Financial Dictionary</Link></li>
          </ul>
        </nav>
        <h1>My Financial Pathways</h1>
        <h2>Your Personalized Financial Literacy Dashboard</h2>
      </header>

      <main className="main-content">
        {/* Budgeting & Expense Management Section */}
        <section className="budgeting-section">
          <h3>Budgeting & Expense Management</h3>
          <form className="budget-form">
            <label htmlFor="income">Monthly Income:</label>
            <input type="number" id="income" value={income} onChange={(e) => setIncome(parseFloat(e.target.value) || 0)} placeholder="Enter your income" />

            <label htmlFor="savings-goal">Savings Goal:</label>
            <input type="number" id="savings-goal" value={savingsGoal} onChange={(e) => setSavingsGoal(parseFloat(e.target.value) || 0)} placeholder="Enter your savings goal" />
          </form>

          {/* Expense Tracker Section */}
          <section className="expense-tracker">
            <h4>Expense Tracker</h4>
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="expense-category">Expense Category:</label>
              <input type="text" id="expense-category" value={expenseCategory} onChange={(e) => setExpenseCategory(e.target.value)} placeholder="e.g., Groceries" />

              <label htmlFor="expense-amount">Amount:</label>
              <input type="number" id="expense-amount" value={expenseAmount} onChange={(e) => setExpenseAmount(parseFloat(e.target.value) || 0)} placeholder="Enter amount" />

              <label htmlFor="expense-date">Date:</label>
              <input type="date" id="expense-date" value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} />

              <label htmlFor="expense-emotion">Emotion:</label>
              <select id="expense-emotion" value={expenseEmotion} onChange={(e) => setExpenseEmotion(e.target.value)}>
                <option value="">Select Emotion</option>
                <option value="Happy">Happy 😊</option>
                <option value="Regretful">Regretful 😞</option>
                <option value="Necessary">Necessary ✅</option>
                <option value="Impulsive">Impulsive 💸</option>
              </select>
              <button type="button" onClick={handleAddExpense} className="add-expense-button">Add Expense</button>
            </form>
          </section>

          {/* Budget Summary Section */}
          <section className="budget-summary">
            <h4>Budget Summary</h4>
            <p>Total Income: ${income}</p>
            <p>Total Expenses: ${totalExpenses}</p>
            <p>Remaining Balance: ${remainingBalance}</p>
          </section>

          {alertMessage && (
            <section className="alert-message">
              <h4 style={{ color: 'red', fontWeight: 'bold' }}>{alertMessage}</h4>
            </section>
          )}
        </section>

        {/* Expense Category Breakdown Visualization */}
        <section className="expense-breakdown">
          <h4>Expense Category Breakdown</h4>
          <div className="chart-container">
            <Pie data={expenseData} />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 My Financial Pathways - Empowering your financial journey for the ones to come.</p>
      </footer>
    </div>
  );
}

export default Dashboard;