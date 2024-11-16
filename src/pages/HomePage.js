import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';
import { FaPiggyBank, FaChartLine, FaBook } from 'react-icons/fa';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
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
const auth = getAuth(app);
const analytics = getAnalytics(app);

function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);
      alert('Sign-up successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert('Error signing up: ' + error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
      alert('Sign-in successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error.message);
      alert('Error signing in: ' + error.message);
    }
  };

  return (
    <div className="homepage-container">
      <header className="header">
        <nav className="navbar">
          <ul className="navbar-links">
            <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
            <li><Link to="/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link></li>
            <li><Link to="/learning-hub"><i className="fas fa-lightbulb"></i> Learning Hub</Link></li>
            <li><Link to="/challenges"><i className="fas fa-tasks"></i> Challenges</Link></li>
            <li><Link to="/rewards-shop"><i className="fas fa-store"></i> Rewards Shop</Link></li>
            </ul>
        </nav>
        <h1>My Financial Pathways</h1>
        <h2>Take the First Step Toward Financial Confidence Today</h2>
      </header>

      <main className="main-content">
        {/* Call to Action Section at the Top */}
        <motion.section 
          className="call-to-action-section"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Ready to Take Charge of Your Financial Well-being?</h3>
          <p>Join us today and start making informed, confident decisions about your finances.</p>
          <button className="sign-up-button" onClick={() => setIsSignUpVisible(true)}>Sign Up Now</button>
          <button className="login-button" onClick={() => setIsLoginVisible(true)}>Login</button>
        </motion.section>

        {/* Introduction Section */}
        <section className="introduction-section">
          <h2>What is the Financial Decision Simulator?</h2>
          <p>The Financial Decision Simulator helps you visualize the impact of your financial decisions over a 10-year period. You can explore different strategies for saving, investing, and managing your finances to achieve your goals.</p>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="features-list">
            <motion.div 
              className="feature-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPiggyBank size={50} color="#1E90FF" />
              <h3>Budgeting Basics</h3>
              <p>Master the art of budgeting and learn how to manage your finances effectively.</p>
              <Link to="/budgeting-basics" className="feature-link">Learn More</Link>
            </motion.div>
            <motion.div 
              className="feature-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaChartLine size={50} color="#1E90FF" />
              <h3>Savings & Investments</h3>
              <p>Discover the power of saving and investing to grow your wealth over time.</p>
              <Link to="/savings-and-investments" className="feature-link">Learn More</Link>
            </motion.div>
            <motion.div 
              className="feature-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBook size={50} color="#1E90FF" />
              <h3>Debt Management</h3>
              <p>Understand how to manage debt effectively and regain control of your finances.</p>
              <Link to="/debt-management" className="feature-link">Learn More</Link>
            </motion.div>
          </div>
        </section>

        {/* Sign Up / Login Popup Section */}
        {isSignUpVisible && (
          <motion.div 
            className="auth-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="auth-popup-content">
              <h3>Sign Up</h3>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleSignUp} className="auth-button">Sign Up</button>
              <button onClick={() => setIsSignUpVisible(false)} className="close-popup-button">Close</button>
            </div>
          </motion.div>
        )}

        {isLoginVisible && (
          <motion.div 
            className="auth-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="auth-popup-content">
              <h3>Login</h3>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleSignIn} className="auth-button">Login</button>
              <button onClick={() => setIsLoginVisible(false)} className="close-popup-button">Close</button>
            </div>
          </motion.div>
        )}
      </main>

      <footer className="footer">
        <p>© 2024 My Financial Pathways - Empowering your financial journey for the ones to come.</p>
      </footer>
    </div>
  );
}

export default HomePage;