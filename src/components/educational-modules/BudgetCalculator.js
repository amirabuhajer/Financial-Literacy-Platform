import React, { useState } from 'react';
import './UniversalFinancialStyles.css';

function BudgetCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [rent, setRent] = useState(0);
  const [utilities, setUtilities] = useState(0);
  const [groceries, setGroceries] = useState(0);
  const [transportation, setTransportation] = useState(0);
  const [savings, setSavings] = useState(0);
  const [otherExpenses, setOtherExpenses] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [balance, setBalance] = useState(0);

  const calculateBudget = () => {
    const expenses = rent + utilities + groceries + transportation + savings + otherExpenses;
    setTotalExpenses(expenses);
    setBalance(monthlyIncome - expenses);
  };

  return (
    <div className="budget-calculator">
      <h1>Monthly Budget Calculator</h1>
      <h2>Calculate Your Monthly Budget Easily</h2>

      <form className="budget-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="monthlyIncome">Monthly Income (CAD):</label>
        <input
          type="number"
          id="monthlyIncome"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)}
          placeholder="Enter your monthly income"
        />

        <label htmlFor="rent">Rent (CAD):</label>
        <input
          type="number"
          id="rent"
          value={rent}
          onChange={(e) => setRent(parseFloat(e.target.value) || 0)}
          placeholder="Enter your monthly rent"
        />

        <label htmlFor="utilities">Utilities (CAD):</label>
        <input
          type="number"
          id="utilities"
          value={utilities}
          onChange={(e) => setUtilities(parseFloat(e.target.value) || 0)}
          placeholder="Enter your monthly utilities"
        />

        <label htmlFor="groceries">Groceries (CAD):</label>
        <input
          type="number"
          id="groceries"
          value={groceries}
          onChange={(e) => setGroceries(parseFloat(e.target.value) || 0)}
          placeholder="Enter your monthly grocery expenses"
        />

        <label htmlFor="transportation">Transportation (CAD):</label>
        <input
          type="number"
          id="transportation"
          value={transportation}
          onChange={(e) => setTransportation(parseFloat(e.target.value) || 0)}
          placeholder="Enter your monthly transportation costs"
        />

        <label htmlFor="savings">Savings (CAD):</label>
        <input
          type="number"
          id="savings"
          value={savings}
          onChange={(e) => setSavings(parseFloat(e.target.value) || 0)}
          placeholder="Enter your monthly savings"
        />

        <label htmlFor="otherExpenses">Other Expenses (CAD):</label>
        <input
          type="number"
          id="otherExpenses"
          value={otherExpenses}
          onChange={(e) => setOtherExpenses(parseFloat(e.target.value) || 0)}
          placeholder="Enter other monthly expenses"
        />

        <button type="button" onClick={calculateBudget} className="calculate-budget-button">
          Calculate Budget
        </button>
      </form>

      {totalExpenses > 0 && (
        <div className="budget-results">
          <h3>Total Monthly Expenses: ${totalExpenses.toFixed(2)}</h3>
          <h3>Remaining Balance: ${balance.toFixed(2)}</h3>
          {balance < 0 && <p className="warning-message">Warning: You are overspending your budget!</p>}
        </div>
      )}
    </div>
  );
}

export default BudgetCalculator;
