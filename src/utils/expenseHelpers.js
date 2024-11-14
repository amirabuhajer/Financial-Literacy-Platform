// expenseHelpers.js

export const calculateTotalExpenses = (expenses) => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };
  
  export const categorizeExpenses = (expenses) => {
    const categories = {};
    expenses.forEach((expense) => {
      categories[expense.category] = (categories[expense.category] || 0) + parseFloat(expense.amount);
    });
    return categories;
  };