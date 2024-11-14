// ChallengesPage.js
import React, { useState } from 'react';
import './ChallengesPage.css';

function ChallengesPage() {
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [points, setPoints] = useState(100);

  const challenges = [
    { id: 1, title: 'Track All Your Expenses for a Week', points: 20 },
    { id: 2, title: 'Set a Monthly Budget and Stick to It', points: 30 },
    { id: 3, title: 'Save $50 from Your Income This Month', points: 25 },
    { id: 4, title: 'Take a Financial Literacy Quiz', points: 15 },
    { id: 5, title: 'Avoid Eating Out for a Week', points: 20 },
  ];

  const handleCompleteChallenge = (challengeId) => {
    if (!completedChallenges.includes(challengeId)) {
      const challenge = challenges.find((c) => c.id === challengeId);
      setCompletedChallenges([...completedChallenges, challengeId]);
      setPoints(points + challenge.points);
    }
  };

  return (
    <div className="challenges-page-container">
      <header className="header">
        <h1>Financial Challenges</h1>
        <h2>Take on Challenges to Improve Your Financial Health</h2>
      </header>

      <main className="main-content">
        <section className="points-section">
          <h3>Your Current Points: <span id="points">{points}</span></h3>
        </section>

        <section className="challenges-section">
          <h4>Available Challenges</h4>
          <ul className="challenges-list">
            {challenges.map((challenge) => (
              <li key={challenge.id} className="challenge-item">
                <span>{challenge.title} - Earn {challenge.points} Points</span>
                <button
                  onClick={() => handleCompleteChallenge(challenge.id)}
                  disabled={completedChallenges.includes(challenge.id)}
                  className="complete-challenge-button"
                >
                  {completedChallenges.includes(challenge.id) ? 'Completed' : 'Complete Challenge'}
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

export default ChallengesPage;