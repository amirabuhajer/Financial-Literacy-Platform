// FinancialLiteracyQuiz.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

function FinancialLiteracyQuiz() {
  const questions = [
    {
      question: "What is budgeting?",
      options: ["Ignoring income", "Spending all money", "Planning income and expenses"],
      answer: 2,
    },
    {
      question: "Why is saving important?",
      options: ["To buy unnecessary things", "To avoid budgeting", "To prepare for unexpected expenses"],
      answer: 2,
    },
    {
      question: "What should be prioritized in a budget?",
      options: ["Luxury items", "Essential expenses", "Entertainment"],
      answer: 1,
    },
    {
      question: "How can you reduce expenses?",
      options: ["Ignore bills", "Track spending", "Spend more on entertainment"],
      answer: 1,
    },
    {
      question: "What percentage of income should ideally be saved?",
      options: ["50%", "0%", "20%"],
      answer: 2,
    },
    {
      question: "What is an emergency fund?",
      options: ["Money for vacations", "Money for luxury items", "Money saved for unexpected expenses"],
      answer: 2,
    },
    {
      question: "How often should you review your budget?",
      options: ["Yearly", "Never", "Monthly"],
      answer: 2,
    },
    {
      question: "What is a variable expense?",
      options: ["An unnecessary expense", "A fixed cost", "An expense that changes each month"],
      answer: 2,
    },
    {
      question: "Why should you track your spending?",
      options: ["To ignore savings", "To understand where your money goes", "To spend more"],
      answer: 1,
    },
    {
      question: "What is the 50/30/20 rule?",
      options: ["A workout routine", "A budgeting rule for spending, saving, and wants", "A saving account type"],
      answer: 1,
    },
    {
      question: "What is compound interest?",
      options: ["Interest on savings only", "Interest on the initial principal and the interest accumulated", "Interest on expenses"],
      answer: 1,
    },
    {
      question: "Why is it important to have financial goals?",
      options: ["To spend more money", "To have a plan for your finances", "To increase debt"],
      answer: 1,
    },
    {
      question: "What does diversification mean in investing?",
      options: ["Putting all your money in one stock", "Spreading investments across various assets", "Buying only bonds"],
      answer: 1,
    },
    {
      question: "What is an asset?",
      options: ["Something that loses value over time", "A liability", "Something you own that has value"],
      answer: 2,
    },
    {
      question: "What is a liability?",
      options: ["A debt or financial obligation", "An asset", "An investment"],
      answer: 0,
    },
    {
      question: "What is a credit score?",
      options: ["A score that tracks your savings", "A measure of your creditworthiness", "A game score"],
      answer: 1,
    },
    {
      question: "How can you improve your credit score?",
      options: ["Not paying bills", "Paying bills on time", "Maxing out your credit cards"],
      answer: 1,
    },
    {
      question: "What is a retirement account?",
      options: ["A spending account", "An account to save for retirement", "A checking account"],
      answer: 1,
    },
    {
      question: "What is inflation?",
      options: ["Decrease in prices", "Increase in the value of money", "Increase in the price of goods and services"],
      answer: 2,
    },
    {
      question: "Why is it important to have insurance?",
      options: ["To pay unnecessary fees", "To protect against financial risks", "To avoid taxes"],
      answer: 1,
    },
    {
      question: "What is a budget deficit?",
      options: ["Spending more than you earn", "Saving more than you spend", "Balancing income and expenses"],
      answer: 0,
    },
    {
      question: "What does ROI stand for?",
      options: ["Return on Investment", "Rate of Inflation", "Rate of Interest"],
      answer: 0,
    },
    {
      question: "What is a bond?",
      options: ["An equity share", "A loan given to a company or government", "A type of savings account"],
      answer: 1,
    },
    {
      question: "What is a mutual fund?",
      options: ["A single stock", "A collection of stocks and bonds", "A type of bank account"],
      answer: 1,
    },
    {
      question: "What does liquidity mean in finance?",
      options: ["How easily assets can be converted to cash", "The interest rate on loans", "The amount of debt you have"],
      answer: 0,
    },
    {
      question: "What is the purpose of an emergency fund?",
      options: ["To buy luxury items", "To cover unexpected expenses", "To invest in stocks"],
      answer: 1,
    },
    {
      question: "What is a high-yield savings account?",
      options: ["A savings account with a higher interest rate", "A checking account", "A loan account"],
      answer: 0,
    },
    {
      question: "Why should you avoid payday loans?",
      options: ["They have high interest rates", "They are free", "They increase your savings"],
      answer: 0,
    },
    {
      question: "What is a FICO score?",
      options: ["A type of bank account", "A credit score used to determine creditworthiness", "A savings plan"],
      answer: 1,
    },
    {
      question: "What is dollar-cost averaging?",
      options: ["Buying investments regularly regardless of market price", "Selling investments at a loss", "Borrowing money to invest"],
      answer: 0,
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      if (selectedOption === questions[currentQuestionIndex].answer) {
        setScore(score + 1);
      }
      setUserAnswers([...userAnswers, { question: questions[currentQuestionIndex], selectedOption }]);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          setShowResults(true);
        }, 5000);
      }
    }
  };

  const handleReview = () => {
    navigate('/financial-tools');
  };

  return (
    <div className="quiz-container">
      {showConfetti && (
        <div className="confetti-container">
          <Confetti />
          <div className="confetti-message">
            <h2>Congratulations! You've completed the quiz!</h2>
          </div>
        </div>
      )}
      {showResults ? (
        <motion.div
          className="completion-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Review Your Answers</h2>
          <div className="review-answers">
            {userAnswers.map((answer, index) => (
              <div key={index} className="review-question">
                <h3>{answer.question.question}</h3>
                <p>Your answer: {answer.question.options[answer.selectedOption]}</p>
                <p className={answer.selectedOption === answer.question.answer ? 'correct' : 'incorrect'}>
                  {answer.selectedOption === answer.question.answer ? 'Correct' : `Correct answer: ${answer.question.options[answer.question.answer]}`}
                </p>
              </div>
            ))}
          </div>
          <motion.button
            className="next-button"
            onClick={handleReview}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to Financial Tools
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="question-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>{questions[currentQuestionIndex].question}</h2>
          <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
          <p>Score: {score}</p>
          <div className="options-container">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <motion.div
                key={index}
                className={`option-box ${selectedOption === index ? 'selected' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOptionSelect(index)}
              >
                {option}
              </motion.div>
            ))}
          </div>
          <motion.button
            className="next-button"
            onClick={handleNext}
            disabled={selectedOption === null}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

export default FinancialLiteracyQuiz;
