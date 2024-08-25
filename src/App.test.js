import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocumentManager from './DocumentManager';
import UserManager from './UserManager';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DocumentManager />} />
        <Route path="/users" element={<UserManager />} />
      </Routes>
    </Router>
  );
}

export default App;
