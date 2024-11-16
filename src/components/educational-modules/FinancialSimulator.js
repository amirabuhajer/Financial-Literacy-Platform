import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
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
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  const [yearlyInvestment, setYearlyInvestment] = useState(0);
  const [investAnnually, setInvestAnnually] = useState(false);
  const [reduceExpenses, setReduceExpenses] = useState(0);
  const [switchToRenting, setSwitchToRenting] = useState(false);
  const [savingsAmount, setSavingsAmount] = useState(0);
  const [fixedExpenses, setFixedExpenses] = useState(0);
  const [nonEssentialExpenses, setNonEssentialExpenses] = useState(0);
  const [houseWorth, setHouseWorth] = useState(0);
  const [monthlyMortgage, setMonthlyMortgage] = useState(0);
  const [simulationResults, setSimulationResults] = useState([]);
  const [events, setEvents] = useState([]);
  const [alternativeScenarios, setAlternativeScenarios] = useState([]);

  // Growth rates used in the simulation for various financial factors
const growthRates = {
    annualIncomeGrowth: 3.153304 / 100, // Annual growth rate for income
    fixedExpensesGrowth: 3.97 / 100, // Annual growth rate for fixed expenses
    nonEssentialExpensesGrowth: 3.37 / 100, // Annual growth rate for non-essential expenses
    savingsInterestRate: 0.94 / 100, // Interest rate for savings
    stockAndMutualFundRate: 25 / 100, // Growth rate for stocks and mutual funds
    houseWorthGrowthRate: 6.42 / 100, // Annual growth rate for house value
};

  // Function to run the financial simulation based on user inputs and growth rates
const runSimulation = () => {
    const results = [];
    let currentAnnualIncome = annualIncome;
    let currentFixedExpenses = fixedExpenses;
    let currentNonEssentialExpenses = nonEssentialExpenses;
    let currentHouseWorth = houseWorth;
    let totalSavings = savingsAmount;
    let totalStockInvestment = yearlyInvestment;

    for (let year = selectedYear; year <= endYear; year++) {
      const currentYearEvents = events.filter((event) => event.year === year);
      currentYearEvents.forEach((event) => {
        switch (event.type) {
          case 'income_change':
            currentAnnualIncome = event.newIncome;
            break;
          case 'expense_change':
            currentFixedExpenses = event.newFixedExpenses;
            currentNonEssentialExpenses = event.newNonEssentialExpenses;
            break;
          case 'house_change':
            currentHouseWorth = event.newHouseWorth;
            monthlyMortgage = event.newMonthlyMortgage;
            break;
          default:
            break;
        }
      });

      currentAnnualIncome = Math.max(0, currentAnnualIncome * (1 + growthRates.annualIncomeGrowth));
      currentFixedExpenses *= 1 + growthRates.fixedExpensesGrowth;
      currentNonEssentialExpenses *= 1 + growthRates.nonEssentialExpensesGrowth;
      currentHouseWorth *= 1 + growthRates.houseWorthGrowthRate;

      if (investAnnually) {
        totalSavings += savingsAmount;
      }
      totalSavings *= 1 + growthRates.savingsInterestRate;

      totalStockInvestment *= 1 + growthRates.stockAndMutualFundRate;

      const adjustedNonEssentialExpenses =
        currentNonEssentialExpenses * (1 - reduceExpenses / 100);
      const totalExpenses =
        currentFixedExpenses +
        adjustedNonEssentialExpenses +
        monthlyMortgage * 12;

      const disposableIncome = currentAnnualIncome - totalExpenses;

      results.push({
        year,
        annual_income: currentAnnualIncome,
        total_expenses: totalExpenses,
        disposable_income: disposableIncome,
        stock_and_mutual_funds_value: totalStockInvestment,
        house_worth: currentHouseWorth,
        total_savings: totalSavings,
      });
    }

    setSimulationResults(results);
    generateAlternativeScenarios(results);
  };

  // Function to generate alternative scenarios based on user-defined events
// e.g., what would happen if certain financial changes did not occur
const generateAlternativeScenarios = (baseResults) => {
    const scenarios = [];

    events.forEach((event) => {
      if (event.type === 'income_change') {
        const modifiedResults = baseResults.map((result) => {
          if (result.year >= event.year) {
            return {
              ...result,
              annual_income: event.newIncome, // Keep the income fixed for the alternative scenario
            };
          }
          return result;
        });
        scenarios.push({
          description: `If the income did not increase in Year ${event.year}...`,
          results: modifiedResults,
        });
      } else if (event.type === 'expense_change') {
        const modifiedResults = baseResults.map((result) => {
          if (result.year >= event.year) {
            return {
              ...result,
              total_expenses: result.total_expenses - (event.newFixedExpenses - fixedExpenses) - (event.newNonEssentialExpenses - nonEssentialExpenses),
            };
          }
          return result;
        });
        scenarios.push({
          description: `If the expenses did not change in Year ${event.year}...`,
          results: modifiedResults,
        });
      } else if (event.type === 'house_change') {
        const modifiedResults = baseResults.map((result) => {
          if (result.year >= event.year) {
            return {
              ...result,
              house_worth: houseWorth * Math.pow(1 + growthRates.houseWorthGrowthRate, result.year - selectedYear), // Recalculate house worth without the change
            };
          }
          return result;
        });
        scenarios.push({
          description: `If the house price did not change in Year ${event.year}...`,
          results: modifiedResults,
        });
      }
    });

    setAlternativeScenarios(scenarios);
  };

// Function to save the simulation results as either a CSV or JSON file
const saveResultsAsFile = (format) => {
    if (format === 'csv') {
      const csvContent = [
        ['Year', 'Annual Income', 'Total Expenses', 'Disposable Income', 'Stock & Mutual Funds', 'House Worth', 'Total Savings'],
        ...simulationResults.map((item) => [
          item.year,
          item.annual_income.toFixed(2),
          item.total_expenses.toFixed(2),
          item.disposable_income.toFixed(2),
          item.stock_and_mutual_funds_value.toFixed(2),
          item.house_worth.toFixed(2),
          item.total_savings.toFixed(2),
        ]),
      ]
        .map((e) => e.join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'simulation_results.csv');
    } else if (format === 'json') {
      const blob = new Blob([JSON.stringify(simulationResults, null, 2)], {
        type: 'application/json;charset=utf-8;',
      });
      saveAs(blob, 'simulation_results.json');
    }
  };

  // Function to save the simulation chart as an image (PNG) or PDF file
const saveChartAsImage = (format) => {
    const chartElement = document.querySelector('canvas');
    if (!chartElement) return;

    html2canvas(chartElement).then((canvas) => {
      if (format === 'png') {
        canvas.toBlob((blob) => {
          saveAs(blob, 'financial_simulation.png');
        });
      } else if (format === 'pdf') {
        const pdf = new jsPDF();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 180, 100);
        pdf.save('financial_simulation.pdf');
      }
    });
  };

  // Function to add a financial event to the simulation (e.g., income change, expense change, house change)
const addEvent = () => {
    const year = parseInt(prompt('Enter the year for the event:'));
    const type = prompt(
      'Enter the type of event (income_change, expense_change, house_change):'
    );

    if (type === 'income_change') {
      const newIncome = parseFloat(prompt('Enter the new annual income:'));
      setEvents([...events, { year, type, newIncome }]);
    } else if (type === 'expense_change') {
      const newFixedExpenses = parseFloat(
        prompt('Enter the new annual fixed expenses:')
      );
      const newNonEssentialExpenses = parseFloat(
        prompt('Enter the new annual non-essential expenses:')
      );
      setEvents([
        ...events,
        { year, type, newFixedExpenses, newNonEssentialExpenses },
      ]);
    } else if (type === 'house_change') {
      const newHouseWorth = parseFloat(prompt('Enter the new house worth:'));
      const newMonthlyMortgage = parseFloat(
        prompt('Enter the new monthly mortgage payment:')
      );
      setEvents([
        ...events,
        { year, type, newHouseWorth, newMonthlyMortgage },
      ]);
    }
  };

  // Chart data to visualize different aspects of the simulation such as income, expenses, savings, etc.
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

  // Function to provide insights into the user's financial resilience based on the simulation results
const financialResilienceInsights = () => {
    if (simulationResults.length > 0) {
      const finalYear = simulationResults[simulationResults.length - 1];
      return (
        <div>
          <h3>Financial Resilience Insights</h3>
          <p>
            Based on your simulated decisions, by the year {finalYear.year}, you have managed to
            accumulate total savings of ${finalYear.total_savings.toFixed(2)}, with gains from
            investments reaching ${finalYear.stock_and_mutual_funds_value.toFixed(2)}.
          </p>
          <p>
            Your disposable income of ${finalYear.disposable_income.toFixed(2)} indicates your
            ability to maintain a stable financial position despite potential inflation impacts.
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
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
        <label>Fixed Expenses (Annual): </label>
        <input
          type="number"
          value={fixedExpenses}
          onChange={(e) => setFixedExpenses(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Non-Essential Expenses (Annual): </label>
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
        <label>Yearly Investment: </label>
        <input
          type="number"
          value={yearlyInvestment}
          onChange={(e) => setYearlyInvestment(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Reinvest Savings Annually: </label>
        <input
          type="checkbox"
          checked={investAnnually}
          onChange={(e) => setInvestAnnually(e.target.checked)}
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
      // Button to start the financial simulation based on user inputs
<button onClick={runSimulation}>Run Simulation</button>
      // Button to add a financial event to the simulation
<button onClick={addEvent}>Add Event</button>
      <button onClick={() => saveResultsAsFile('csv')}>Download Results as CSV</button>
      <button onClick={() => saveResultsAsFile('json')}>Download Results as JSON</button>
      <button onClick={() => saveChartAsImage('png')}>Download Chart as PNG</button>
      <button onClick={() => saveChartAsImage('pdf')}>Download Chart as PDF</button>

      {simulationResults.length > 0 && (
        <>
          <Line data={chartData} />
          <h2>Yearly Data</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                <th>Year</th>
                <th>Annual Income</th>
                <th>Total Expenses</th>
                <th>Disposable Income</th>
                <th>Stock & Mutual Funds</th>
                <th>House Worth</th>
                <th>Total Savings</th>
              </tr>
            </thead>
            <tbody>
              {simulationResults.map((item) => (
                <tr key={item.year}>
                  <td>{item.year}</td>
                  <td>${item.annual_income.toFixed(2)}</td>
                  <td>${item.total_expenses.toFixed(2)}</td>
                  <td>${item.disposable_income.toFixed(2)}</td>
                  <td>${item.stock_and_mutual_funds_value.toFixed(2)}</td>
                  <td>${item.house_worth.toFixed(2)}</td>
                  <td>${item.total_savings.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {financialResilienceInsights()}
          <h2>Alternative Scenarios</h2>
          {alternativeScenarios.map((scenario, index) => (
            <div key={index}>
              <h3>{scenario.description}</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Annual Income</th>
                    <th>Total Expenses</th>
                    <th>Disposable Income</th>
                    <th>Stock & Mutual Funds</th>
                    <th>House Worth</th>
                    <th>Total Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {scenario.results.map((item) => (
                    <tr key={item.year}>
                      <td>{item.year}</td>
                      <td>${item.annual_income.toFixed(2)}</td>
                      <td>${item.total_expenses.toFixed(2)}</td>
                      <td>${item.disposable_income.toFixed(2)}</td>
                      <td>${item.stock_and_mutual_funds_value.toFixed(2)}</td>
                      <td>${item.house_worth.toFixed(2)}</td>
                      <td>${item.total_savings.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FinancialSimulator;
