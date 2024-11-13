import React, { useState, useEffect, useCallback } from 'react';
import './MyFinancialPathways.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function MyFinancialPathways() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ category: '', amount: '', date: '', emotion: '' });
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [goalAmount, setGoalAmount] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [timeToGoal, setTimeToGoal] = useState(null);
  const [suggestion, setSuggestion] = useState('');
  const [expenseTrendAlert, setExpenseTrendAlert] = useState('');
  const [dailyTip, setDailyTip] = useState('');
  const [financialHealthPoints, setFinancialHealthPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState({});
  const [petHealth, setPetHealth] = useState(100);
  const [petHappiness, setPetHappiness] = useState(100);
  const [petAccessories, setPetAccessories] = useState([]);
  const [availablePets, setAvailablePets] = useState(["Basic Pet", "Dragon Pet", "Unicorn Pet"]);
  const [currentPet, setCurrentPet] = useState("Basic Pet");

  // Daily financial tips
  const tips = [
    "Set small, achievable financial goals to stay motivated.",
    "Track your expenses daily to prevent overspending.",
    "Avoid impulse purchases by creating a shopping list.",
    "Pay yourself first: prioritize savings before spending.",
    "Limit your discretionary spending to improve savings."
  ];

  useEffect(() => {
    calculateSuggestions();
    analyzeExpenseTrends();
    updateCategoryBreakdown();
    getDailyTip();
    updatePetStatus();
  }, [income, expenses]);

  // Function to add an expense
  const handleAddExpense = () => {
    const expenseAmount = parseFloat(newExpense.amount);
    if (!isNaN(expenseAmount) && newExpense.category && newExpense.emotion) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({ category: '', amount: '', date: '', emotion: '' });
      earnPoints(10); // Earn points for adding an expense (positive action)
    }
  };

  // Function to calculate dynamic suggestions based on income and expenses
  const calculateSuggestions = useCallback(() => {
    const expenseTotal = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    const remainingBalance = parseFloat(income) - expenseTotal;

    if (remainingBalance < 0) {
      setSuggestion('Your expenses exceed your income. Consider reducing discretionary spending like dining out or subscriptions.');
      updatePetHealth(-10);
    } else if (remainingBalance < income * 0.2) {
      setSuggestion('You’re close to exceeding your budget. Monitor variable expenses and prioritize saving.');
    } else {
      setSuggestion('You’re on track! Consider increasing your savings goal to build a cushion for unexpected expenses.');
      earnPoints(20); // Earn points for staying on track
      updatePetHappiness(10);
    }
  }, [income, expenses]);

  // Function to calculate time to reach savings goal
  const calculateTimeToGoal = useCallback(() => {
    const goal = parseFloat(goalAmount);
    const savings = parseFloat(monthlySavings);
    if (!isNaN(goal) && !isNaN(savings) && savings > 0) {
      const months = Math.ceil(goal / savings);
      setTimeToGoal(months);
      earnPoints(30); // Earn points for setting a goal and planning savings
    }
  }, [goalAmount, monthlySavings]);

  // Function to analyze expense trends and set alerts if significant increases are detected
  const analyzeExpenseTrends = useCallback(() => {
    const recentExpenses = expenses.slice(-5); // Consider the last 5 expenses as a recent sample
    const average = recentExpenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0) / recentExpenses.length;

    // Trigger alert if recent average spending is high
    if (average > income * 0.3) {
      setExpenseTrendAlert('Warning: Your recent spending has significantly increased. Consider reviewing your expenses.');
      updatePetHappiness(-10);
    } else {
      setExpenseTrendAlert('');
    }
  }, [expenses, income]);

  // Function to get a daily motivational tip
  const getDailyTip = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setDailyTip(tips[randomIndex]);
  }, []);

  // Function to update category breakdown for pie chart visualization
  const updateCategoryBreakdown = useCallback(() => {
    const categories = { Income: income, Savings: savingsGoal, Expenses: 0 };
    expenses.forEach(expense => {
      categories.Expenses += parseFloat(expense.amount);
    });
    setExpenseCategories(categories);
  }, [expenses, income, savingsGoal]);

  // Function to earn points
  const earnPoints = (points) => {
    setFinancialHealthPoints(financialHealthPoints + points);
  };

  // Function to spend points
  const spendPoints = (points, reward) => {
    if (financialHealthPoints >= points) {
      setFinancialHealthPoints(financialHealthPoints - points);
      setRewards([...rewards, reward]);
      if (availablePets.includes(reward)) {
        setCurrentPet(reward);
      } else {
        setPetAccessories([...petAccessories, reward]);
      }
    } else {
      alert('Not enough points to redeem this reward.');
    }
  };

  // Function to update pet health
  const updatePetHealth = (change) => {
    setPetHealth((prevHealth) => Math.max(0, Math.min(100, prevHealth + change)));
  };

  // Function to update pet happiness
  const updatePetHappiness = (change) => {
    setPetHappiness((prevHappiness) => Math.max(0, Math.min(100, prevHappiness + change)));
  };

  // Function to update pet status
  const updatePetStatus = () => {
    if (petHealth === 0) {
      alert('Your virtual pet is not doing well. Consider revising your spending habits!');
    }
  };

  // Data for the expense category breakdown pie chart
  const expenseData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="financial-pathways-container">
      <header className="header">
        <h1>My Financial Pathways</h1>
        <h2>A Personalized, Inclusive Financial Literacy Platform</h2>
      </header>

      <main className="main-content">
        {/* Daily Motivational Tip */}
        <section className="daily-tip-section">
          <h3>Daily Financial Tip</h3>
          <p>{dailyTip}</p>
        </section>

        {/* Financial Health Points Display */}
        <section className="points-section">
          <h3>Your Financial Health Points: {financialHealthPoints}</h3>
          <button onClick={() => document.getElementById('rewards-shop').scrollIntoView({ behavior: 'smooth' })} className="view-rewards-button">
            View Rewards Shop
          </button>
        </section>

        {/* Virtual Pet Section */}
        <section className="virtual-pet-section">
          <h3>Your Financial Health Pet: {currentPet}</h3>
          <div className="pet-status">
            <p>Health: {petHealth}%</p>
            <p>Happiness: {petHappiness}%</p>
            <p>Accessories: {petAccessories.join(', ') || 'None'}</p>
          </div>
          <div className="pet-image">
            <img
              src="images/Pet.png"
              alt="Your virtual pet"
              style={{ width: '150px', height: '150px' }}
            />
          </div>
        </section>

        {/* Budgeting & Expense Management Section */}
        <section className="budgeting-section">
          <h3>Budgeting & Expense Management</h3>
          <form className="budget-form">
            <label>Monthly Income:</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
            />
            <label>Savings Goal:</label>
            <input
              type="number"
              value={savingsGoal}
              onChange={(e) => setSavingsGoal(parseFloat(e.target.value) || 0)}
            />
          </form>

          {/* Future Self Simulation Section */}
          <section className="future-self-section">
            <h4>Future Self Simulation</h4>
            <label>Goal Amount (e.g., Vacation, Car):</label>
            <input
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(parseFloat(e.target.value) || 0)}
            />
            <label>Monthly Savings Amount:</label>
            <input
              type="number"
              value={monthlySavings}
              onChange={(e) => setMonthlySavings(parseFloat(e.target.value) || 0)}
            />
            <button onClick={calculateTimeToGoal} className="calculate-goal-button">
              Calculate Time to Goal
            </button>
            {timeToGoal !== null && (
              <p className="goal-result">
                At a monthly savings of ${monthlySavings}, you’ll reach your goal of ${goalAmount} in approximately {timeToGoal} months.
              </p>
            )}
          </section>

          {/* Expense Tracker */}
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

          {/* Dynamic Budgeting Suggestions */}
          <section className="budget-suggestions">
            <h4>Budgeting Suggestions</h4>
            <p>{suggestion}</p>
          </section>

          {/* Expense Trend Alert */}
          <section className="expense-trend-alert">
            {expenseTrendAlert && <p>{expenseTrendAlert}</p>}
          </section>

          {/* Budget Summary */}
          <section className="budget-summary">
            <h4>Budget Summary</h4>
            <p>Total Income: ${income}</p>
            <p>Total Expenses: ${expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0)}</p>
            <p>Remaining Balance: ${income - expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0)}</p>
          </section>
        </section>

        {/* Expense Category Breakdown Visualization */}
        <section className="expense-breakdown">
          <h4>Expense Category Breakdown</h4>
          <Pie data={expenseData} />
        </section>

        {/* Rewards Shop */}
        <section id="rewards-shop" className="rewards-shop">
          <h3>Rewards Shop</h3>
          <div className="rewards-list">
            <button onClick={() => spendPoints(50, 'Motivational Badge')} className="reward-button">
              Spend 50 Points - Motivational Badge
            </button>
            <button onClick={() => spendPoints(100, 'Financial Tip: How to Save More')} className="reward-button">
              Spend 100 Points - Financial Tip: How to Save More
            </button>
            <button onClick={() => spendPoints(150, 'App Theme Customization')} className="reward-button">
              Spend 150 Points - App Theme Customization
            </button>
            <button onClick={() => spendPoints(200, 'Dragon Pet')} className="reward-button">
              Spend 200 Points - Dragon Pet
            </button>
            <button onClick={() => spendPoints(300, 'Unicorn Pet')} className="reward-button">
              Spend 300 Points - Unicorn Pet
            </button>
          </div>
          <div className="rewards-earned">
            <h4>Your Rewards:</h4>
            {rewards.length > 0 ? (
              <ul>
                {rewards.map((reward, index) => (
                  <li key={index}>{reward}</li>
                ))}
              </ul>
            ) : (
              <p>No rewards earned yet. Start earning points by managing your finances wisely!</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default MyFinancialPathways;
