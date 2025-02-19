import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Results from "./pages/Result";
import History from "./pages/History"; // Import History Page
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/results" element={<Results />} />
          <Route path="/history" element={<History />} /> {/* History Page Route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
