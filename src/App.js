// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import BudgetingBasics from './components/educational-modules/BudgetingBasics';
import SavingsAndInvestments from './components/educational-modules/SavingsAndInvestments';
import DebtManagement from './components/educational-modules/DebtManagement';
import HomePage from './pages/HomePage';
import ChallengesPage from './pages/ChallengesPage';
import RewardsShopPage from './pages/RewardsShopPage';
import VirtualPetPage from './pages/VirtualPetPage';
import DictionaryPage from './pages/DictionaryPage';
import LearningHubPage from './pages/LearningHubPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/DashBoard" element={<Dashboard />} />
          <Route path="/budgeting-basics" element={<BudgetingBasics />} />
          <Route path="/savings-and-investments" element={<SavingsAndInvestments />} />
          <Route path="/debt-management" element={<DebtManagement />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/rewards-shop" element={<RewardsShopPage />} />
          <Route path="/virtual-pet" element={<VirtualPetPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="/learning-hub" element={<LearningHubPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
