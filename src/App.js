import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import DocumentManager from './components/DocumentManager';

function App() {
  return (
    <Router>
      <div>
        <h1>Online Information Record Management System</h1>
        {/* Navigation Links */}
        <nav>
          <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/documents">Document Manager</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/documents" element={<DocumentManager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
