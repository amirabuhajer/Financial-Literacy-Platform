import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const FinancialSimulator = () => {
  const [selectedYear, setSelectedYear] = useState(2011);
  const [simulationResults, setSimulationResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const runSimulation = async () => {
    try {
      console.log('Running simulation for year:', selectedYear);
      setLoading(true);

      // Make a POST request to the backend API
      const response = await axios.post('http://localhost:5000/run_simulation', {
        start_year: selectedYear,
      });

      // Log response data to check if data is returned as expected
      console.log('Response data:', response.data);

      if (response.status === 200 && response.data.length > 0) {
        // Set the response data to state
        setSimulationResults(response.data);
        setErrorMessage(''); // Clear any previous errors
      } else {
        setErrorMessage('No data returned from the server.');
        console.warn('No data returned from the server.');
      }
    } catch (error) {
      console.error('Error running simulation:', error);
      setErrorMessage('There was an issue running the simulation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Chart data configuration
  const chartData = {
    labels: simulationResults.map((item) => item.year),
    datasets: [
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
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1>Financial Simulator</h1>
      <div>
        <label>Select Start Year: </label>
        <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
          {[...Array(2022 - 2011).keys()].map((i) => {
            const year = 2011 + i;
            return <option key={year} value={year}>{year}</option>;
          })}
        </select>
        <button onClick={runSimulation} disabled={loading}>
          {loading ? 'Running...' : 'Run Simulation'}
        </button>
      </div>
      
      {errorMessage && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <strong>{errorMessage}</strong>
        </div>
      )}

      {simulationResults.length > 0 && (
        <div>
          <h2>Simulation Results</h2>
          <div style={{ height: '400px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
          <div>
            {simulationResults.map((result) => (
              <div key={result.year}>
                <h3>Year: {result.year}</h3>
                <p>Annual Income: {result.annual_income !== null && result.annual_income !== undefined ? result.annual_income.toFixed(2) : 'N/A'}</p>
                <p>Total Expenses: {result.total_expenses !== null && result.total_expenses !== undefined ? result.total_expenses.toFixed(2) : 'N/A'}</p>
                <p>Disposable Income: {result.disposable_income !== null && result.disposable_income !== undefined ? result.disposable_income.toFixed(2) : 'N/A'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialSimulator;
