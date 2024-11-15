import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserInfo.css';
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

function UserInfo() {
  const questions = [
    {
      question: "What is your current level of financial knowledge?",
      options: ["Beginner", "Intermediate", "Advanced"]
    },
    {
      question: "What are your financial goals?",
      options: ["Save for a car", "Reduce debt", "Build an emergency fund", "Save for a house", "Plan for retirement"]
    },
    {
      question: "What is your current income level?",
      options: ["Less than $25,000", "$25,000 - $50,000", "$50,000 - $100,000", "More than $100,000"]
    },
    {
      question: "How would you describe your savings habits?",
      options: ["I save regularly", "I save occasionally", "I struggle to save", "I don't save at all"]
    },
    {
      question: "What is your risk tolerance for investments?",
      options: ["Low", "Moderate", "High"]
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
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

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          navigate('/dashboard');
        }, 3000);
      }
    }
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
      {currentQuestionIndex < questions.length ? (
        <motion.div
          className="question-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>{questions[currentQuestionIndex].question}</h2>
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
            Next
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="completion-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Thank you for answering the questions! Let's get started on your financial journey.</h2>
        </motion.div>
      )}
    </div>
  );
}

export default UserInfo;
