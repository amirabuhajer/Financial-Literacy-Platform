import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';
import Confetti from 'react-confetti';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { motion } from 'framer-motion';

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

function QuizInvestment() {
  const questions = [
    {
      question: "What is the main benefit of saving money?",
      options: ["To buy luxury items", "To prepare for unexpected expenses", "To avoid paying taxes"],
      answer: 1,
    },
    {
      question: "What is compound interest?",
      options: ["Interest on the original amount only", "Interest on both the original amount and the accumulated interest", "A type of bank account"],
      answer: 1,
    },
    {
      question: "What is a diversified investment portfolio?",
      options: ["Investing all money in one stock", "Investing in different types of assets to reduce risk", "Not investing at all"],
      answer: 1,
    },
    {
      question: "Why should you start saving early?",
      options: ["To take advantage of compound interest", "To avoid spending money", "To impress friends"],
      answer: 0,
    },
    {
      question: "What is the purpose of an emergency fund?",
      options: ["To cover unexpected expenses", "To invest in stocks", "To buy a new car"],
      answer: 0,
    },
    {
      question: "What is a low-risk investment option?",
      options: ["Cryptocurrency", "Government bonds", "Penny stocks"],
      answer: 1,
    },
    {
      question: "What is the 50/30/20 rule?",
      options: ["A rule for investment diversification", "A budgeting rule for spending, saving, and wants", "A tax regulation"],
      answer: 1,
    },
    {
      question: "What is the main advantage of automating your savings?",
      options: ["It ensures consistency in saving", "It increases spending", "It reduces bank fees"],
      answer: 0,
    },
    {
      question: "Why is it important to set financial goals?",
      options: ["To help guide your spending and saving decisions", "To avoid paying bills", "To increase credit card usage"],
      answer: 0,
    },
    {
      question: "What is an index fund?",
      options: ["A type of savings account", "A fund that tracks a specific market index", "A high-interest loan"],
      answer: 1,
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

  const handleNext = async () => {
    if (selectedOption !== null) {
      // Save the response to Firestore
      try {
        const user = auth.currentUser;
        if (user) {
          const questionKey = `question_${currentQuestionIndex + 1}`;
          await setDoc(doc(db, 'users', user.uid), {
            [questionKey]: questions[currentQuestionIndex].options[selectedOption]
          }, { merge: true });
        } else {
          alert('User not logged in. Please sign in first.');
          return;
        }
      } catch (error) {
        console.error('Error saving user info:', error);
        alert('Error saving information: ' + error.message);
        return;
      }

      // Update score
      if (selectedOption === questions[currentQuestionIndex].answer) {
        setScore(score + 1);
      }

      // Save the answer
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
    navigate('/debt-management');
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
            Continue to Debt Management
          </motion.button>
        </motion.div>
      ) : currentQuestionIndex < questions.length ? (
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
      ) : null}
    </div>
  );
}

export default QuizInvestment;
