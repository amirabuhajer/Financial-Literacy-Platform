import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Link, useNavigate } from 'react-router-dom';
import './FinancialSimulator.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FinancialSimulator = () => {
  const [selectedYear, setSelectedYear] = useState(2021);
  const [endYear, setEndYear] = useState(2031);
  const [annualIncome, setAnnualIncome] = useState(0);
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);
  const [reduceExpenses, setReduceExpenses] = useState(0);
  const [switchToRenting, setSwitchToRenting] = useState(false);
  const [savingsAmount, setSavingsAmount] = useState(0);
  const [monthlyMortgage, setMonthlyMortgage] = useState(0);
  const [fixedExpenses, setFixedExpenses] = useState(0);
  const [nonEssentialExpenses, setNonEssentialExpenses] = useState(0);
  const [houseWorth, setHouseWorth] = useState(0);
  const [simulationResults, setSimulationResults] = useState([]);
  const [events, setEvents] = useState([]);

  // Growth factors
  const growthRates = {
    annualIncomeGrowth: 3.153304 / 100, // Annual income growth
    fixedExpensesGrowth: 3.97 / 100, // Fixed yearly expenses growth
    nonEssentialExpensesGrowth: 3.37 / 100, // Non-essential monthly expenses growth
    savingsInterestRate: 0.94 / 100, // Savings interest rate
    stockAndMutualFundRate: 25 / 100, // Annual stock and mutual funds growth
    houseWorthGrowthRate: 6.42 / 100, // Annual house worth growth
  };

  const runSimulation = () => {
    const results = [];
    let currentAnnualIncome = annualIncome;
    let currentFixedExpenses = fixedExpenses; // Fixed expenses are already annualized
    let currentNonEssentialExpenses = nonEssentialExpenses * 12; // Convert monthly to annual
    let currentHouseWorth = houseWorth;
    let rentExpenses = 0;
    let totalSavings = savingsAmount;
    let totalStockInvestment = monthlyInvestment * 12; // Total annual investment in stocks
  
    for (let year = selectedYear; year <= endYear; year++) {
      const currentYearEvents = events.filter((event) => event.year === year);
      currentYearEvents.forEach((event) => {
        switch (event.type) {
          case 'payraise':
            currentAnnualIncome *= 1 + event.percentage / 100;
            break;
          case 'new_job':
            currentAnnualIncome = event.newIncome;
            break;
          case 'job_loss':
            currentAnnualIncome *= 1 - event.percentage / 100;
            break;
          case 'better_job':
            currentAnnualIncome *= 1 + event.percentage / 100;
            break;
          default:
            break;
        }
      });
  
      // Apply annual growth rates
      currentAnnualIncome *= 1 + growthRates.annualIncomeGrowth;
      currentFixedExpenses *= 1 + growthRates.fixedExpensesGrowth;
      currentNonEssentialExpenses *= 1 + growthRates.nonEssentialExpensesGrowth;
      rentExpenses *= 1 + growthRates.fixedExpensesGrowth; // Assume rent grows similarly to fixed expenses
      currentHouseWorth *= 1 + growthRates.houseWorthGrowthRate;
  
      // Add user-specified savings amount every year
      totalSavings += savingsAmount;
      totalSavings *= 1 + growthRates.savingsInterestRate;
  
      // Stock and mutual fund investment increases by 25% annually
      totalStockInvestment *= 1 + growthRates.stockAndMutualFundRate;
  
      // Calculate adjusted non-essential expenses based on user input
      const adjustedNonEssentialExpenses =
        currentNonEssentialExpenses * (1 - reduceExpenses / 100);
  
      // Adjust for renting
      const adjustedRentExpenses = switchToRenting
        ? rentExpenses * 0.9 // Reduced rent for renting scenario
        : rentExpenses;
  
      // Total annual expenses calculation
      const totalExpenses =
        currentFixedExpenses +
        adjustedNonEssentialExpenses +
        adjustedRentExpenses +
        monthlyMortgage * 12; // Convert monthly mortgage to annual
  
      const disposableIncome = currentAnnualIncome - totalExpenses;
  
      results.push({
        year,
        annual_income: currentAnnualIncome,
        total_expenses: totalExpenses,
        disposable_income: disposableIncome,
        stock_and_mutual_funds_value: totalStockInvestment,
        house_worth: currentHouseWorth,
        monthly_mortgage: monthlyMortgage,
        total_savings: totalSavings,
      });
    }
  
    setSimulationResults(results);
  };
  

  const chartData = {
    labels: simulationResults.map((item) => item.year),
    datasets: [
      {
        label: 'Stock and Mutual Funds Value Over Time',
        data: simulationResults.map((item) => item.stock_and_mutual_funds_value),
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false,
      },
      {
        label: 'Disposable Income Over Time',
        data: simulationResults.map((item) => item.disposable_income),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Total Expenses Over Time',
        data: simulationResults.map((item) => item.total_expenses),
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
      },
      {
        label: 'House Worth Over Time',
        data: simulationResults.map((item) => item.house_worth),
        borderColor: 'rgba(54,162,235,1)',
        fill: false,
      },
      {
        label: 'Total Savings Over Time',
        data: simulationResults.map((item) => item.total_savings),
        borderColor: 'rgba(34,139,34,1)',
        fill: false,
      },
      {
        label: 'Annual Income Over Time',
        data: simulationResults.map((item) => item.annual_income),
        borderColor: 'rgba(255,165,0,1)',
        fill: false,
      },
    ],
  };

  return (

    

    <div>
     
     <nav className="navbar">
          <ul className="navbar-links">
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/learning-hub" className={location.pathname === '/learning-hub' ? 'active' : ''}>
                <i className="fas fa-lightbulb"></i> Learning Hub
              </Link>
            </li>
            <li>
              <Link to="/challenges" className={location.pathname === '/challenges' ? 'active' : ''}>
                <i className="fas fa-tasks"></i> Challenges
              </Link>
            </li>
            <li>
              <Link to="/financial-simulator" className={location.pathname === '/financial-simulator' ? 'active' : ''}>
                <i className="FaCalculator"></i> Financial Simulator
              </Link>
            </li>
            
          </ul>
        </nav>

        <h1>Financial Simulator</h1>

        

      <div>
        <label>Annual Income: </label>
        <input
          type="number"
          value={annualIncome}
          onChange={(e) => setAnnualIncome(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Fixed Expenses: </label>
        <input
          type="number"
          value={fixedExpenses}
          onChange={(e) => setFixedExpenses(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Non-Essential Expenses: </label>
        <input
          type="number"
          value={nonEssentialExpenses}
          onChange={(e) => setNonEssentialExpenses(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>House Worth: </label>
        <input
          type="number"
          value={houseWorth}
          onChange={(e) => setHouseWorth(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Monthly Investment: </label>
        <input
          type="number"
          value={monthlyInvestment}
          onChange={(e) => setMonthlyInvestment(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Savings Amount (Added Annually): </label>
        <input
          type="number"
          value={savingsAmount}
          onChange={(e) => setSavingsAmount(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Reduce Non-Essential Expenses (%): </label>
        <input
          type="number"
          value={reduceExpenses}
          onChange={(e) => setReduceExpenses(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Switch to Renting: </label>
        <input
          type="checkbox"
          checked={switchToRenting}
          onChange={(e) => setSwitchToRenting(e.target.checked)}
        />
      </div>
      <div>
        <label>Monthly Mortgage Payment: </label>
        <input
          type="number"
          value={monthlyMortgage}
          onChange={(e) => setMonthlyMortgage(parseFloat(e.target.value))}
        />
      </div>
      <button onClick={runSimulation}>Run Simulation</button>
      {simulationResults.length > 0 && <Line data={chartData} />}
    </div>
  );
};

export default FinancialSimulator;
