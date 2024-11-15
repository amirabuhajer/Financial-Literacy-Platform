import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserInfo.css';
import Confetti from 'react-confetti';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCug7bVevo1BM2JMUPW2hfuPaun8y48gjQ",
  authDomain: "financial-literacy-platform.firebaseapp.com",
  projectId: "financial-literacy-platform",
  storageBucket: "financial-literacy-platform.firebasestorage.app",
  messagingSenderId: "398997944222",
  appId: "1:398997944222:web:75bf096e6eb61644fb088f",
  measurementId: "G-LND62GTE2P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function UserInfo() {
  const [financialKnowledge, setFinancialKnowledge] = useState('');
  const [interests, setInterests] = useState([]);
  const [goals, setGoals] = useState('');
  const [incomeLevel, setIncomeLevel] = useState('');
  const [savingsHabits, setSavingsHabits] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlySavings, setMonthlySavings] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          financialKnowledge,
          interests,
          goals,
          incomeLevel,
          savingsHabits,
          riskTolerance,
          monthlyIncome,
          monthlySavings,
        });
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          navigate('/dashboard');
        }, 3000);
      } else {
        alert('User not logged in. Please sign in first.');
      }
    } catch (error) {
      console.error('Error saving user info:', error);
      alert('Error saving information: ' + error.message);
    }
  };

  const handleInterestChange = (interest) => {
    setInterests((prevInterests) =>
      prevInterests.includes(interest)
        ? prevInterests.filter((i) => i !== interest)
        : [...prevInterests, interest]
    );
  };

  return (
    <div className="user-info-container">
      {showConfetti && (
        <div className="confetti-container">
          <Confetti />
          <div className="confetti-message">
            <h2>Welcome! We're so happy you've joined us!</h2>
          </div>
        </div>
      )}
      <h1>Tell Us More About You</h1>
      <p>We'd love to get to know you better! Let's make your financial journey as fun and educational as possible.</p>
      <form onSubmit={handleSubmit} className="user-info-form">
        <label>
          What is your current level of financial knowledge?
          <select
            value={financialKnowledge}
            onChange={(e) => setFinancialKnowledge(e.target.value)}
            required
          >
            <option value="">Select one...</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </label>

        <label>
          What are your interests in financial education?
          <div className="interests-options">
            <label>
              <input
                type="checkbox"
                value="Budgeting"
                checked={interests.includes('Budgeting')}
                onChange={() => handleInterestChange('Budgeting')}
              />
              Budgeting
            </label>
            <label>
              <input
                type="checkbox"
                value="Investing"
                checked={interests.includes('Investing')}
                onChange={() => handleInterestChange('Investing')}
              />
              Investing
            </label>
            <label>
              <input
                type="checkbox"
                value="Saving"
                checked={interests.includes('Saving')}
                onChange={() => handleInterestChange('Saving')}
              />
              Saving
            </label>
            <label>
              <input
                type="checkbox"
                value="Debt Management"
                checked={interests.includes('Debt Management')}
                onChange={() => handleInterestChange('Debt Management')}
              />
              Debt Management
            </label>
            <label>
              <input
                type="checkbox"
                value="Retirement Planning"
                checked={interests.includes('Retirement Planning')}
                onChange={() => handleInterestChange('Retirement Planning')}
              />
              Retirement Planning
            </label>
          </div>
        </label>

        <label>
          What are your financial goals?
          <select
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            required
          >
            <option value="">Select one...</option>
            <option value="Save for a car">Save for a car</option>
            <option value="Reduce debt">Reduce debt</option>
            <option value="Build an emergency fund">Build an emergency fund</option>
            <option value="Save for a house">Save for a house</option>
            <option value="Plan for retirement">Plan for retirement</option>
          </select>
        </label>

        <label>
          What is your current income level?
          <select
            value={incomeLevel}
            onChange={(e) => setIncomeLevel(e.target.value)}
            required
          >
            <option value="">Select one...</option>
            <option value="Less than $25,000">Less than $25,000</option>
            <option value="$25,000 - $50,000">$25,000 - $50,000</option>
            <option value="$50,000 - $100,000">$50,000 - $100,000</option>
            <option value="More than $100,000">More than $100,000</option>
          </select>
        </label>

        <label>
          How much do you make per month?
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            placeholder="e.g., 3000"
            required
          />
        </label>

        <label>
          How much are you willing to save per month?
          <input
            type="number"
            value={monthlySavings}
            onChange={(e) => setMonthlySavings(e.target.value)}
            placeholder="e.g., 500"
            required
          />
        </label>

        <label>
          How would you describe your savings habits?
          <select
            value={savingsHabits}
            onChange={(e) => setSavingsHabits(e.target.value)}
            required
          >
            <option value="">Select one...</option>
            <option value="I save regularly">I save regularly</option>
            <option value="I save occasionally">I save occasionally</option>
            <option value="I struggle to save">I struggle to save</option>
            <option value="I don't save at all">I don't save at all</option>
          </select>
        </label>

        <label>
          What is your risk tolerance for investments?
          <select
            value={riskTolerance}
            onChange={(e) => setRiskTolerance(e.target.value)}
            required
          >
            <option value="">Select one...</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </label>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default UserInfo;