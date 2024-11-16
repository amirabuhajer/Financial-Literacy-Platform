// NetWorthTracker.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UniversalFinancialStyles.css';

function NetWorthTracker() {
  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [assetName, setAssetName] = useState('');
  const [assetValue, setAssetValue] = useState(0);
  const [liabilityName, setLiabilityName] = useState('');
  const [liabilityValue, setLiabilityValue] = useState(0);

  const handleAddAsset = () => {
    const newAsset = { name: assetName, value: parseFloat(assetValue) };
    setAssets([...assets, newAsset]);
    setAssetName('');
    setAssetValue(0);
  };

  const handleAddLiability = () => {
    const newLiability = { name: liabilityName, value: parseFloat(liabilityValue) };
    setLiabilities([...liabilities, newLiability]);
    setLiabilityName('');
    setLiabilityValue(0);
  };

  const calculateNetWorth = () => {
    const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
    const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.value, 0);
    return totalAssets - totalLiabilities;
  };

  return (
    <div className="container">
      <header className="header">
        <nav className="navbar">
          <ul className="navbar-links">
            <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
            <li><Link to="/budgeting-basics"><i className="fa fa-wallet"></i> Budgeting Basics</Link></li>
            <li><Link to="/financial-tools"><i className="fa fa-tools"></i> Financial Tools</Link></li>
          </ul>
        </nav>
        <h1>Net Worth Tracker</h1>
        <h2>Track Your Net Worth by Calculating Your Assets and Liabilities</h2>
      </header>

      <main className="main-content">
        <section className="calculator-section">
          <div className="calculator-form">
            <h3>Add an Asset</h3>
            <label htmlFor="asset-name">Asset Name:</label>
            <input
              type="text"
              id="asset-name"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              placeholder="Enter asset name"
            />

            <label htmlFor="asset-value">Asset Value ($):</label>
            <input
              type="number"
              id="asset-value"
              value={assetValue}
              onChange={(e) => setAssetValue(parseFloat(e.target.value) || 0)}
              placeholder="Enter asset value"
            />

            <button type="button" className="button" onClick={handleAddAsset}>
              Add Asset
            </button>
          </div>

          <div className="calculator-form">
            <h3>Add a Liability</h3>
            <label htmlFor="liability-name">Liability Name:</label>
            <input
              type="text"
              id="liability-name"
              value={liabilityName}
              onChange={(e) => setLiabilityName(e.target.value)}
              placeholder="Enter liability name"
            />

            <label htmlFor="liability-value">Liability Value ($):</label>
            <input
              type="number"
              id="liability-value"
              value={liabilityValue}
              onChange={(e) => setLiabilityValue(parseFloat(e.target.value) || 0)}
              placeholder="Enter liability value"
            />

            <button type="button" className="button" onClick={handleAddLiability}>
              Add Liability
            </button>
          </div>

          <div className="net-worth">
            <h3>Your Net Worth</h3>
            <p>${calculateNetWorth().toFixed(2)}</p>
          </div>

          <div className="list-section">
            <div className="assets-list">
              <h4>Assets</h4>
              <ul>
                {assets.map((asset, index) => (
                  <li key={index} className="card">
                    {asset.name}: ${asset.value.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="liabilities-list">
              <h4>Liabilities</h4>
              <ul>
                {liabilities.map((liability, index) => (
                  <li key={index} className="card">
                    {liability.name}: ${liability.value.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 My Financial Pathways - Empowering your financial journey for the ones to come.</p>
      </footer>
    </div>
  );
}

export default NetWorthTracker;
