import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SavingsAndInvestments.css';

function SavingsAndInvestments() {
  const [points, setPoints] = useState(100);
  const [stocks, setStocks] = useState({});
  const [investment, setInvestment] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [years, setYears] = useState(0);
  const [futureValue, setFutureValue] = useState(0);

  const handleBuyStock = () => {
    if (investment && investmentAmount > 0 && investmentAmount <= points) {
      const newPortfolio = [...portfolio, { name: investment, amount: investmentAmount }];
      setPortfolio(newPortfolio);
      setPoints(points - investmentAmount);
      setInvestment('');
      setInvestmentAmount(0);
    }
  };

  const calculateFutureValue = () => {
    const rate = interestRate / 100;
    const n = years;
    const futureValue = monthlySavings * (((1 + rate) ** n - 1) / rate);
    setFutureValue(futureValue.toFixed(2));
  };

  return (
    <div className="savings-investments-container">
      <header className="header">
      <nav className="navbar">
          <ul className="navbar-links">
            <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
            <li><Link to="/budgeting-basics"><i className="fa fa-wallet"></i> Budgeting Basics</Link></li>
            <li><Link to="/savings-and-investments"><i className="fa fa-chart-line"></i> Savings & Investments</Link></li>
            <li><Link to="/debt-management"><i className="fa fa-hand-holding-usd"></i> Debt Management</Link></li>
            <li><Link to="/challenges"><i className="fa fa-tasks"></i> Challenges</Link></li>
            <li><Link to="/rewards-shop"><i className="fa fa-star"></i> Rewards Shop</Link></li>
            <li><Link to="/virtual-pet"><i className="fa fa-paw"></i> Virtual Pet</Link></li>
            <li><Link to="/dictionary"><i className="fa fa-book"></i> Financial Dictionary</Link></li>
          </ul>
        </nav>
        <h1>Savings & Investments</h1>
        <h2>Learn How to Grow Your Wealth</h2>
      </header>

      <main className="main-content">
        {/* Educational Videos Section */}
        <section className="education-section">
          <h3>Educational Videos</h3>
          <div className="videos">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/p7HKvqRI_Bo?si=drU4t8uydwWWiIe1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>        
          <iframe width="560" height="315" src="https://www.youtube.com/embed/IIKr2915l2g?si=Au-itKkdtK8VCmct" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </section>

        {/* Savings and Investment Tips Section */}
        <section className="tips-section">
          <h3>Savings & Investment Tips</h3>
          <ul>
            <li>Start saving early to take advantage of compound interest.</li>
            <li>Diversify your investments to reduce risk.</li>
            <li>Set specific financial goals and make a plan to achieve them.</li>
            <li>Automate your savings to ensure consistency.</li>
            <li>Invest in low-cost index funds for long-term growth.</li>
          </ul>
        </section>

        {/* Savings & Investment Calculator Section */}
        <section className="calculator-section">
          <h3>Savings & Investment Calculator</h3>
          <form className="calculator-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="monthly-savings">Monthly Savings Amount ($):</label>
            <input type="number" id="monthly-savings" value={monthlySavings} onChange={(e) => setMonthlySavings(parseFloat(e.target.value) || 0)} placeholder="Enter monthly savings amount" />

            <label htmlFor="interest-rate">Annual Interest Rate (%):</label>
            <input type="number" id="interest-rate" value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)} placeholder="Enter interest rate" />

            <label htmlFor="years">Number of Years:</label>
            <input type="number" id="years" value={years} onChange={(e) => setYears(parseFloat(e.target.value) || 0)} placeholder="Enter number of years" />

            <button type="button" onClick={calculateFutureValue} className="calculate-button">Calculate Future Value</button>
          </form>

          {futureValue > 0 && (
            <div className="future-value-result">
              <p>The future value of your savings is: <strong>${futureValue}</strong></p>
            </div>
          )}
        </section>

        {/* Stock Simulation Section */}
        <section className="stock-simulation-section">
          <h3>Stock Investment Simulation</h3>
          <p>You have <strong>{points}</strong> reward points available to invest.</p>
          <form className="investment-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="investment">Choose a Stock:</label>
            <input type="text" id="investment" value={investment} onChange={(e) => setInvestment(e.target.value)} placeholder="e.g., TechCorp" />

            <label htmlFor="investment-amount">Investment Amount (Points):</label>
            <input type="number" id="investment-amount" value={investmentAmount} onChange={(e) => setInvestmentAmount(parseFloat(e.target.value) || 0)} placeholder="Enter amount" />

            <button type="button" onClick={handleBuyStock} className="buy-stock-button">Buy Stock</button>
          </form>

          <div className="portfolio">
            <h4>Your Portfolio</h4>
            {portfolio.length > 0 ? (
              <ul>
                {portfolio.map((stock, index) => (
                  <li key={index}>{stock.name} - {stock.amount} points</li>
                ))}
              </ul>
            ) : (
              <p>No investments yet. Start investing to grow your points!</p>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 My Financial Pathways - Empowering your financial journey for the ones to come.</p>
      </footer>
    </div>
  );
}

export default SavingsAndInvestments;