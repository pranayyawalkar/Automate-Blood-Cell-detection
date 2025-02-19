import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <motion.nav 
        className="navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="logo">Blood Cell Detection System</h1>
        <ul className="nav-links">
          <li><Link to="/" className="nav-item">Home</Link></li>
          <li><Link to="/upload" className="nav-item">Upload</Link></li>
          <li><Link to="/results" className="nav-item">Results</Link></li>
          <li><Link to="/history" className="nav-item">History</Link></li>
          <li><Link to="/contact" className="nav-item">Contact</Link></li>
        </ul>
      </motion.nav>
      
      {/* Hero Section */}
      <motion.header 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="hero-title">Advanced Blood Cell Detection</h2>
        <p className="hero-text">Upload microscopic images for real-time blood cell analysis, classification, and infection diagnosis using AI.</p>
        <Link to="/upload" className="upload-button">Upload Sample</Link>
      </motion.header>
      
      {/* Features Section */}
      <section className="features">
        {['Accurate Detection', 'Graphical Analysis', 'Instant Reports'].map((feature, index) => (
          <motion.div 
            key={index} 
            className="feature-card"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="feature-title">{feature}</h3>
            <p className="feature-text">
              {index === 0 ? "Our AI model identifies and classifies blood cells with high precision, ensuring reliable results." :
              index === 1 ? "Detailed visual representation of blood cell distribution using interactive charts and reports." :
              "Download comprehensive reports for medical evaluation and diagnosis."}
            </p>
          </motion.div>
        ))}
      </section>
      
      {/* Footer */}
      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <p>&copy; 2025 Blood Cell Detection System | All Rights Reserved</p>
      </motion.footer>
    </div>
  );
};

export default Home;
