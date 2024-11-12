import React, { useState } from 'react';
import './MyFinancialPathways.css';

function MyFinancialPathways() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ category: '', amount: '', date: '', emotion: '' });
  const [savingsGoal, setSavingsGoal] = useState('');
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Sample quiz questions
  const quizQuestions = [
    { question: "What is budgeting?", options: ["Planning income and expenses", "Spending all money", "Ignoring income"], answer: "Planning income and expenses" },
    { question: "Why is saving important?", options: ["To spend more", "To prepare for emergencies", "To have no money"], answer: "To prepare for emergencies" },
    { question: "What is a good way to reduce expenses?", options: ["Ignore bills", "Identify unnecessary expenses", "Increase expenses"], answer: "Identify unnecessary expenses" }
  ];

  // Handle adding an expense with an associated emotion
  const handleAddExpense = () => {
    const expenseAmount = parseFloat(newExpense.amount);
    if (!isNaN(expenseAmount) && newExpense.category && newExpense.emotion) {
      setExpenses([...expenses, newExpense]);
      setTotalExpenses(totalExpenses + expenseAmount);
      setNewExpense({ category: '', amount: '', date: '', emotion: '' });
    }
  };


  const handleQuizAnswer = (selectedOption) => {
    if (quizQuestions[quizStep].answer === selectedOption) {
      setScore(score + 1);
    }
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const remainingBalance = income ? parseFloat(income) - totalExpenses : 0;

  return (
    <div className="financial-pathways-container">
      <header className="header">
        <h1>My Financial Pathways</h1>
        <h2>A Personalized, Inclusive Financial Literacy Platform</h2>
      </header>

      <main className="main-content">
        {/* Budgeting & Expense Management Section */}
        <section className="budgeting-section">
          <h3>Budgeting & Expense Management</h3>
          <form className="budget-form">
            <label>Monthly Income:</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
            <label>Savings Goal:</label>
            <input
              type="number"
              value={savingsGoal}
              onChange={(e) => setSavingsGoal(e.target.value)}
            />
          </form>

          <section className="expense-tracker">
            <h4>Expense Tracker</h4>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>Expense Category:</label>
              <input
                type="text"
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              />
              <label>Amount:</label>
              <input
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              />
              <label>Date:</label>
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              />
              <label>Emotion:</label>
              <select
                value={newExpense.emotion}
                onChange={(e) => setNewExpense({ ...newExpense, emotion: e.target.value })}
                className="emotion-selector"
              >
                <option value="">Select Emotion</option>
                <option value="Happy">Happy 😊</option>
                <option value="Regretful">Regretful 😞</option>
                <option value="Necessary">Necessary ✅</option>
                <option value="Impulsive">Impulsive 💸</option>
              </select>
              <button type="button" onClick={handleAddExpense} className="add-expense-button">
                Add Expense
              </button>
            </form>

            <div className="expense-list">
              <h5>Recorded Expenses:</h5>
              {expenses.length > 0 ? (
                <ul>
                  {expenses.map((expense, index) => (
                    <li key={index} className="expense-item">
                      <span>🛒 {expense.category}</span> - ${expense.amount} on {expense.date}
                      <span className="expense-emotion"> {expense.emotion}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No expenses recorded yet.</p>
              )}
            </div>
          </section>

          <section className="budget-summary">
            <h4>Budget Summary</h4>
            <p>Total Income: ${income || 0}</p>
            <p>Total Expenses: ${totalExpenses}</p>
            <p>Remaining Balance: ${remainingBalance}</p>
            <p>Savings Goal: ${savingsGoal || 0}</p>
          </section>
          <section className="suggestions-section">
            <h4>Budgeting Suggestions</h4>
            <ul>
              <li>💡 Try reducing non-essential expenses if your balance is low.</li>
              <li>💰 Set aside a small amount for emergencies.</li>
              <li>📈 If under budget, aim for a higher savings goal!</li>
            </ul>
          </section>
        </section>

        {/* Education Section */}
        <section className="education-section">
          <h3>Learn About Budgeting</h3>
          <p>Budgeting is the process of creating a plan to spend your money wisely. This involves tracking income, planning for expenses, and setting financial goals. Saving is a crucial part of budgeting, helping you prepare for unexpected costs and reach financial independence.</p>
          <ul>
            <li>✨ Understand your monthly income and expenses.</li>
            <li>✨ Prioritize essential expenses like rent, bills, and food.</li>
            <li>✨ Set a monthly savings goal to build a financial cushion.</li>
          </ul>
          <h4>Interactive Quiz</h4>
          {quizCompleted ? (
            <div className="quiz-results">
              <p>Quiz Completed! 🎉 You scored {score} out of {quizQuestions.length}!</p>
            </div>
          ) : (
            <div className="quiz-question">
              <p>{quizQuestions[quizStep].question}</p>
              {quizQuestions[quizStep].options.map((option, index) => (
                <button key={index} onClick={() => handleQuizAnswer(option)} className="quiz-option">
                  {option}
                </button>
              ))}
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

export default MyFinancialPathways;
