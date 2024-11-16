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

function QuizDebt() {
  const questions = [
    {
      question: "What is debt consolidation?",
      options: ["Combining multiple debts into one", "Ignoring debts", "Paying only interest"],
      answer: 0,
    },
    {
      question: "Why is it important to pay off high-interest debt first?",
      options: ["To increase interest costs", "To reduce the total interest paid over time", "To avoid paying principal"],
      answer: 1,
    },
    {
      question: "What is the debt-to-income ratio?",
      options: ["A ratio that compares your monthly debt payments to your monthly income", "The percentage of income saved", "A measure of how much you spend on rent"],
      answer: 0,
    },
    {
      question: "What is a minimum payment?",
      options: ["The smallest amount you must pay on a debt each month", "The full amount of your debt", "An optional payment"],
      answer: 0,
    },
    {
      question: "Why should you create a debt repayment plan?",
      options: ["To ignore debts", "To manage and prioritize debts effectively", "To increase spending"],
      answer: 1,
    },
    {
      question: "What is an emergency fund?",
      options: ["A fund to cover unexpected expenses", "A loan for buying a car", "Money borrowed from friends"],
      answer: 0,
    },
    {
      question: "How can you reduce credit card debt?",
      options: ["Pay only the minimum payment", "Make extra payments towards the principal", "Take out more loans"],
      answer: 1,
    },
    {
      question: "What is debt settlement?",
      options: ["Negotiating with creditors to reduce the total amount owed", "Paying more than you owe", "Ignoring creditor calls"],
      answer: 0,
    },
    {
      question: "Why is it important to maintain a budget while paying off debt?",
      options: ["To ensure you can make timely debt payments", "To increase your spending", "To avoid paying debts"],
      answer: 0,
    },
    {
      question: "What is the avalanche method of debt repayment?",
      options: ["Paying off debts with the lowest balance first", "Paying off debts with the highest interest rate first", "Paying all debts at once"],
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

export default QuizDebt;
