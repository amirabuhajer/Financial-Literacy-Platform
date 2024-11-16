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
import UserInfo from './pages/UserInfo';
import Quiz from './components/educational-modules/Quiz';
import QuizInvestment from './components/educational-modules/QuizInvestment';
import QuizDebt from './components/educational-modules/QuizDebt';
import FinancialTools from './components/educational-modules/FinancialTools';
import DebtPayoffCalculator from './components/educational-modules/DebtPayoffCalculator';
import EmergencyFundCalculator from './components/educational-modules/EmergencyFundCalculator';
import InvestmentSimulator from './components/educational-modules/InvestmentSimulator';
import RetirementSavingsCalculator from './components/educational-modules/RetirementSavingsCalculator';
import NetWorthTracker from './components/educational-modules/NetWorthTracker';
import CreditCardPayoffCalculator from './components/educational-modules/CreditCardPayoffCalculator';
import ExpenseTracker from './components/educational-modules/ExpenseTracker';
import FinancialLiteracyQuiz from './components/educational-modules/FinancialLiteracyQuiz';
import BudgetCalculator from './components/educational-modules/BudgetCalculator';
import SavingsGoalPlanner from './components/educational-modules/SavingsGoalPlanner';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/DashBoard" element={<Dashboard />} />
          <Route path="/budgeting-basics" element={<BudgetingBasics />} />
          <Route path="/savings-and-investments" element={<SavingsAndInvestments />} />
          <Route path="/debt-management" element={<DebtManagement />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/rewards-shop" element={<RewardsShopPage />} />
          <Route path="/virtual-pet" element={<VirtualPetPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="/learning-hub" element={<LearningHubPage />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz-investment" element={<QuizInvestment />} />
          <Route path="/quiz-debt" element={<QuizDebt />} />
          <Route path="/financial-tools" element={<FinancialTools />} />
          <Route path="/debt-payoff-calculator" element={<DebtPayoffCalculator />} />
          <Route path="/emergency-fund-calculator" element={<EmergencyFundCalculator />} />
          <Route path="/investment-simulator" element={<InvestmentSimulator />} />
          <Route path="/retirement-savings-calculator" element={<RetirementSavingsCalculator />} />
          <Route path="/net-worth-tracker" element={<NetWorthTracker />} />
          <Route path="/credit-card-payoff-calculator" element={<CreditCardPayoffCalculator />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route path="/financial-literacy-quiz" element={<FinancialLiteracyQuiz />} />
          <Route path="/budget-calculator" element={<BudgetCalculator />} />
          <Route path="/savings-goal-planner" element={<SavingsGoalPlanner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
