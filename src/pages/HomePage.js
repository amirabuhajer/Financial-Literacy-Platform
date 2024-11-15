import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';
import { FaPiggyBank, FaChartLine, FaBook } from 'react-icons/fa';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

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
      navigate('/user-info');
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
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/learning-hub">Learning Hub</Link></li>
            <li><Link to="/challenges">Challenges</Link></li>
            <li><Link to="/rewards-shop">Rewards Shop</Link></li>
            <li><Link to="/virtual-pet">Virtual Pet</Link></li>
            <li><Link to="/dictionary">Financial Dictionary</Link></li>
          </ul>
        </nav>
        <h1>My Financial Pathways</h1>
        <h2>Take the First Step Toward Financial Confidence Today</h2>
      </header>

      <main className="main-content">
        {/* Introduction Section */}
        <section className="introduction-section">
          <h2>Welcome to Your Personalized Financial Education Platform</h2>
          <p>Our goal is to equip you with the essential knowledge and practical tools needed to take control of your financial future. Start exploring today and build a strong financial foundation.</p>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="features-list">
            <div className="feature-item">
              <FaPiggyBank size={50} color="#1E90FF" />
              <h3>Budgeting Basics</h3>
              <p>Master the art of budgeting and learn how to manage your finances effectively.</p>
              <Link to="/budgeting-basics" className="feature-link">Learn More</Link>
            </div>
            <div className="feature-item">
              <FaChartLine size={50} color="#1E90FF" />
              <h3>Savings & Investments</h3>
              <p>Discover the power of saving and investing to grow your wealth over time.</p>
              <Link to="/savings-and-investments" className="feature-link">Learn More</Link>
            </div>
            <div className="feature-item">
              <FaBook size={50} color="#1E90FF" />
              <h3>Debt Management</h3>
              <p>Understand how to manage debt effectively and regain control of your finances.</p>
              <Link to="/debt-management" className="feature-link">Learn More</Link>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="call-to-action-section">
          <h3>Ready to Take Charge of Your Financial Well-being?</h3>
          <p>Join us today and start making informed, confident decisions about your finances. Together, we’ll simplify your financial journey, one step at a time.</p>
          <button className="sign-up-button" onClick={() => setIsSignUpVisible(true)}>Sign Up Now</button>
          <button className="sign-up-button" onClick={() => setIsLoginVisible(true)}>Login</button>
        </section>

        {/* Sign Up / Login Popup Section */}
        {isSignUpVisible && (
          <div className="auth-popup">
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
          </div>
        )}

        {isLoginVisible && (
          <div className="auth-popup">
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
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2024 My Financial Pathways - Empowering your financial journey for the ones to come.</p>
      </footer>
    </div>
  );
}

export default HomePage;
