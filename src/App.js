import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';  // Example Home component
import Read from './components/Read';  // The component to read data

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/read" element={<Read />} />
      </Routes>
    </Router>
  );
};

export default App;
