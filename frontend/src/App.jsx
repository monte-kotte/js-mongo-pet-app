import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PetPage from './pages/PetPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/pet-app" element={<PetPage />} />
      </Routes>
    </Router>
  );
};

export default App;
