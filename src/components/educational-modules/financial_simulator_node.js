// Node.js backend for financial simulation using Express
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Function to parse CSV data
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    console.log(`Starting to parse CSV file at path: ${filePath}`);
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        console.log('CSV Parsing completed, number of rows:', results.length);
        resolve(results);
      })
      .on('error', (error) => {
        console.error('Error parsing CSV file:', error);
        reject(error);
      });
  });
}

// Function to run financial simulation
function runSimulation(data, startYear) {
  const results = [];
  for (let year = startYear; year <= 2021; year++) {
    const yearData = data.find((row) => parseInt(row['Year']) === year);
    if (yearData) {
      try {
        const annualIncome = parseFloat(yearData['Average Annual Income (CAD)'].replace(/,/g, ''));
        const fixedExpenses = parseFloat(yearData['Fixed Monthly Expenses (CAD)']) || 0;
        const nonEssentialExpenses = parseFloat(yearData['Non-Essential Monthly Expenses (CAD)']) || 0;
        const rentExpenses = parseFloat(yearData['Monthly Average Rent (CAD)']) || 0;
        const totalExpenses = (fixedExpenses + nonEssentialExpenses + rentExpenses) * 12;
        const disposableIncome = annualIncome - totalExpenses;

        results.push({
          year,
          annual_income: annualIncome,
          total_expenses: isNaN(totalExpenses) ? 0 : totalExpenses,
          disposable_income: isNaN(disposableIncome) ? 0 : disposableIncome,
        });
      } catch (error) {
        console.error(`Error processing data for year ${year}:`, error);
      }
    } else {
      console.warn(`No data found for year ${year}`);
    }
  }
  return results;
}

// Endpoint to handle GET requests at the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Financial Simulator API');
});

// Endpoint to run the simulation
app.post('/run_simulation', async (req, res) => {
  try {
    console.log('Received request to run simulation with body:', req.body);
    const { start_year } = req.body;

    if (!start_year || isNaN(start_year)) {
      throw new Error('Invalid or missing start_year in request');
    }

    // Use an absolute path for the CSV file
    const csvFilePath = path.join(__dirname, '../datasets/income_and_expenses.csv');
    const data = await parseCSV(csvFilePath);

    if (data.length === 0) {
      throw new Error('CSV file appears to be empty or improperly formatted');
    }

    const results = runSimulation(data, start_year);

    if (results.length === 0) {
      console.warn('Simulation produced no results. Please check input data.');
      res.status(404).send('No simulation results found for the given start year');
    } else {
      res.json(results);
    }
  } catch (error) {
    console.error('Error running simulation:', error);
    res.status(500).send('Error running simulation: ' + error.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});