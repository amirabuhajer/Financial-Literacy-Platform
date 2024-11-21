// RewardsShopPage.js
import React, { useState } from 'react';
import './RewardsShopPage.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RewardsShopPage() {
  const location = useLocation();
  const [points, setPoints] = useState(100);
  const [purchasedRewards, setPurchasedRewards] = useState([]);

  const rewards = [
    { id: 1, name: 'Virtual Pet Hat', points: 30 },
    { id: 2, name: 'Background Upgrade', points: 50 },
    { id: 3, name: 'Custom Pet Name', points: 40 },
    { id: 4, name: 'Pet Toy', points: 25 },
    { id: 5, name: 'Special Badge', points: 60 },
  ];

  const handlePurchaseReward = (rewardId) => {
    const reward = rewards.find((r) => r.id === rewardId);
    if (points >= reward.points && !purchasedRewards.includes(rewardId)) {
      setPoints(points - reward.points);
      setPurchasedRewards([...purchasedRewards, rewardId]);
    }
  };

  return (
    <div className="rewards-shop-container">
      <header className="header">

      <nav className="navbar">
          <ul className="navbar-links">
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
            <li>
              <Link to="/budgeting-basics" className={location.pathname === '/budgeting-basics' ? 'active' : ''}>
                <i className="fa fa-wallet"></i> Budgeting Basics
              </Link>
            </li>
            <li>
              <Link to="/avings-and-investments" className={location.pathname === '/savings-and-investments' ? 'active' : ''}>
                <i className="fa fa-chart-line"></i> Savings and Investments
              </Link>
            </li>
            <li>
              <Link to="/debt-management" className={location.pathname === '/debt-management' ? 'active' : ''}>
                <i className="fa fa-hand-holding-usd"></i> Debt Management
              </Link>
            </li>
            <li>
              <Link to="/rewards-shop" className={location.pathname === '/rewards-shop' ? 'active' : ''}>
                <i className="fas fa-store"></i> Rewards Shop
              </Link>
            </li>
            <li>
              <Link to="/challenges" className={location.pathname === '/challenges' ? 'active' : ''}>
                <i className="fas fa-tasks"></i> Challenges
              </Link>
            </li>
          </ul>
        </nav>

        <h1>Rewards Shop</h1>
        <h2>Redeem Your Points for Exciting Rewards</h2>
      </header>

      <main className="main-content">
        <section className="points-section">
          <h3>Your Current Points: <span id="points">{points}</span></h3>
        </section>

        <section className="rewards-section">
          <h4>Available Rewards</h4>
          <ul className="rewards-list">
            {rewards.map((reward) => (
              <li key={reward.id} className="reward-item">
                <span>{reward.name} - Cost: {reward.points} Points</span>
                <button
                  onClick={() => handlePurchaseReward(reward.id)}
                  disabled={points < reward.points || purchasedRewards.includes(reward.id)}
                  className="purchase-reward-button"
                >
                  {purchasedRewards.includes(reward.id) ? 'Purchased' : 'Redeem'}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 My Financial Pathways - Empowering your financial journey for the ones to come.</p>
      </footer>
    </div>
  );
}

export default RewardsShopPage;