// chartHelpers.js

import { Pie } from 'react-chartjs-2';

export const generateExpenseChartData = (expenseCategories) => {
  return {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };
};

export const ExpensePieChart = ({ data }) => {
  return <Pie data={data} />;
};
