import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LearningHubPage.css';  // Import the CSS file for styling
import { FaQuestionCircle, FaPlayCircle, FaTasks } from 'react-icons/fa';

function LearningHubPage() {
  const [quizScore, setQuizScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState({ budgeting: false, debt: false, savings: false });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const quizzes = {
    budgeting: [
      {
        question: 'What is the first step in creating a budget?',
        options: ['Determine your income', 'List your expenses', 'Set your goals', 'Save for emergencies'],
        answer: 0,
      },
      {
        question: 'What should you do if your expenses exceed your income?',
        options: ['Ignore it', 'Use credit cards', 'Reduce discretionary spending', 'Take a loan'],
        answer: 2,
      },
      {
        question: 'Why is saving important?',
        options: ['To buy luxury items', 'To have a safety net', 'To pay off loans', 'To invest in risky assets'],
        answer: 1,
      },
      {
        question: 'What is the 50/30/20 rule?',
        options: ['50% needs, 30% wants, 20% savings', '50% wants, 30% savings, 20% needs', '50% savings, 30% needs, 20% wants', 'None of the above'],
        answer: 0,
      },
      {
        question: 'How often should you review your budget?',
        options: ['Once a year', 'Monthly', 'Weekly', 'Never'],
        answer: 1,
      },
    ],
    debt: [
      {
        question: 'Which of the following is a good way to manage debt?',
        options: ['Ignore credit card bills', 'Pay the minimum amount', 'Create a repayment plan', 'Take more loans'],
        answer: 2,
      },
      {
        question: 'What should you do if you are unable to pay your debt on time?',
        options: ['Ignore it', 'Contact your lender', 'Take another loan', 'Sell your assets'],
        answer: 1,
      },
      {
        question: 'Which type of debt is considered good debt?',
        options: ['Credit card debt', 'Student loan', 'Gambling debt', 'Personal loan for vacation'],
        answer: 1,
      },
      {
        question: 'How can you reduce your debt effectively?',
        options: ['Pay the minimum amount', 'Use a debt snowball method', 'Ignore it', 'Take more loans'],
        answer: 1,
      },
      {
        question: 'What is the debt-to-income ratio?',
        options: ['A measure of your income compared to savings', 'A measure of your debt compared to income', 'A measure of your expenses compared to income', 'None of the above'],
        answer: 1,
      },
    ],
    savings: [
      {
        question: 'What is a good percentage of your income to save each month?',
        options: ['1%', '5%', '10%', '50%'],
        answer: 2,
      },
      {
        question: 'Which of these is considered a good investment for beginners?',
        options: ['Penny stocks', 'Real estate', 'Mutual funds', 'Cryptocurrency'],
        answer: 2,
      },
      {
        question: 'What is compound interest?',
        options: ['Interest on the principal only', 'Interest on both principal and accumulated interest', 'A fixed interest rate', 'None of the above'],
        answer: 1,
      },
      {
        question: 'Which savings account offers the highest interest?',
        options: ['Checking account', 'Savings account', 'Money market account', 'Piggy bank'],
        answer: 2,
      },
      {
        question: 'Why should you diversify your investments?',
        options: ['To increase risk', 'To reduce risk', 'To avoid taxes', 'To focus on one type of asset'],
        answer: 1,
      },
    ],
  };

  const handleStartQuiz = (quizType) => {
    setQuizQuestions(quizzes[quizType]);
    setShowQuiz({ budgeting: quizType === 'budgeting', debt: quizType === 'debt', savings: quizType === 'savings' });
    setCurrentQuestion(0);
    setQuizScore(0);
  };

  const handleAnswerSelection = (index) => {
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].answer) {
      setQuizScore(quizScore + 1);
    }
    setSelectedAnswer(null);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleRetakeQuiz = () => {
    setQuizScore(0);
    setCurrentQuestion(0);
    setShowQuiz({ budgeting: false, debt: false, savings: false });
  };

  const progressPercentage = ((currentQuestion / quizQuestions.length) * 100).toFixed(0);

  return (
    <div className="learning-hub-container">
      <header className="header">
        <nav className="navbar">
          <ul className="navbar-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/learning-hub">Learning Hub</Link></li>
            <li><Link to="/challenges">Challenges</Link></li>
            <li><Link to="/rewards-shop">Rewards Shop</Link></li>
            <li><Link to="/virtual-pet">Virtual Pet</Link></li>
            <li><Link to="/dictionary">Financial Dictionary</Link></li>
          </ul>
        </nav>
        <h1>Learning Hub</h1>
        <h2>Explore and Learn: Build Your Financial Literacy</h2>
      </header>

      <main className="main-content">
        <section className="learning-section">
          <h3><FaPlayCircle /> Learn About Budgeting Basics</h3>
          <p>Understand how to create a budget, manage your spending, and set achievable financial goals.</p>
          <Link to="/budgeting-basics" className="learning-link">Learn More</Link>
          <div className="interactive-content">
            <button className="quiz-button" onClick={() => handleStartQuiz('budgeting')}><FaQuestionCircle /> Take the Budgeting Quiz</button>
            <div className="embedded-video">
              <iframe width="300" height="169" src="https://www.youtube.com/embed/example1" title="Budgeting Basics Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </section>

        {showQuiz.budgeting && currentQuestion < quizQuestions.length && (
          <section className="quiz-section">
            <h3>Quiz: Question {currentQuestion + 1}</h3>
            <p>{quizQuestions[currentQuestion].question}</p>
            <div className="quiz-options">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`quiz-option ${selectedAnswer === index ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelection(index)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="submit-answer-button" onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
              Submit Answer
            </button>
          </section>
        )}

        {showQuiz.budgeting && currentQuestion === quizQuestions.length && (
          <section className="quiz-results-section">
            <h3>Quiz Completed!</h3>
            <p>Your Score: {quizScore} / {quizQuestions.length}</p>
            <button className="retake-quiz-button" onClick={handleRetakeQuiz}>Retake Quiz</button>
          </section>
        )}

        <section className="learning-section">
          <h3><FaPlayCircle /> Manage Debt Effectively</h3>
          <p>Learn how to manage debt, reduce loans, and develop strategies for financial independence.</p>
          <Link to="/debt-management" className="learning-link">Learn More</Link>
          <div className="interactive-content">
            <button className="quiz-button" onClick={() => handleStartQuiz('debt')}><FaQuestionCircle /> Take the Debt Management Quiz</button>
            <div className="embedded-video">
              <iframe width="300" height="169" src="https://www.youtube.com/embed/example2" title="Debt Management Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </section>

        {showQuiz.debt && currentQuestion < quizQuestions.length && (
          <section className="quiz-section">
            <h3>Quiz: Question {currentQuestion + 1}</h3>
            <p>{quizQuestions[currentQuestion].question}</p>
            <div className="quiz-options">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`quiz-option ${selectedAnswer === index ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelection(index)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="submit-answer-button" onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
              Submit Answer
            </button>
          </section>
        )}

        {showQuiz.debt && currentQuestion === quizQuestions.length && (
          <section className="quiz-results-section">
            <h3>Quiz Completed!</h3>
            <p>Your Score: {quizScore} / {quizQuestions.length}</p>
            <button className="retake-quiz-button" onClick={handleRetakeQuiz}>Retake Quiz</button>
          </section>
        )}

        <section className="learning-section">
          <h3><FaPlayCircle /> Save and Invest Wisely</h3>
          <p>Discover ways to save effectively and learn the basics of investing to grow your wealth.</p>
          <Link to="/savings-and-investments" className="learning-link">Learn More</Link>
          <div className="interactive-content">
            <button className="quiz-button" onClick={() => handleStartQuiz('savings')}><FaQuestionCircle /> Take the Savings & Investments Quiz</button>
            <div className="embedded-video">
              <iframe width="300" height="169" src="https://www.youtube.com/embed/example3" title="Savings and Investments Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </section>

        {showQuiz.savings && currentQuestion < quizQuestions.length && (
          <section className="quiz-section">
            <h3>Quiz: Question {currentQuestion + 1}</h3>
            <p>{quizQuestions[currentQuestion].question}</p>
            <div className="quiz-options">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`quiz-option ${selectedAnswer === index ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelection(index)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="submit-answer-button" onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
              Submit Answer
            </button>
          </section>
        )}

        {showQuiz.savings && currentQuestion === quizQuestions.length && (
          <section className="quiz-results-section">
            <h3>Quiz Completed!</h3>
            <p>Your Score: {quizScore} / {quizQuestions.length}</p>
            <button className="retake-quiz-button" onClick={handleRetakeQuiz}>Retake Quiz</button>
          </section>
        )}

        {/* Progress Tracker Section */}
        <section className="progress-tracker-section">
          <h3><FaTasks /> Your Learning Progress</h3>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progressPercentage}%` }}>{progressPercentage}% Completed</div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 My Financial Pathways - Empowering your financial journey for the ones to come.</p>
      </footer>
    </div>
  );
}

export default LearningHubPage;
