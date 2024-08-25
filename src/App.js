import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import DocumentManager from './components/DocumentManager';
import './App.css'; // Ensure you import your CSS file

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>Online Information Record Management System</h1>
        </header>
        <nav className="nav">
          <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/documents">Document Manager</Link></li>
          </ul>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/documents" element={<DocumentManager />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>Contact us: info@example.com</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
