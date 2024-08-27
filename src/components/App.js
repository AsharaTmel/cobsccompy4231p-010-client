// src/components/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TrainRoutes from './UserSide/TrainRoutes';
import AdminDashboard from './AdminSide/AdminDashboard';
import Login from './AdminSide/Login';
import AssignedEngines from './AdminSide/AssignedEngines';
import TrainDetails from './AdminSide/TrainDetails';
import EngineDetails from './AdminSide/EngineDetails';
import HistoricalData from './AdminSide/historicalData'; // Import the new component
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TrainRoutes />} />
          <Route path="/admin" element={<Login onLogin={handleLogin} />} />
          <Route path="/admin/dashboard" element={isAuthenticated ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/admin" />} />
          <Route path="/admin/dashboard/assignedEngines" element={isAuthenticated ? <AssignedEngines /> : <Navigate to="/admin" />} />
          <Route path="/admin/dashboard/trainDetails" element={isAuthenticated ? <TrainDetails /> : <Navigate to="/admin" />} />
          <Route path="/admin/dashboard/engineDetails" element={isAuthenticated ? <EngineDetails /> : <Navigate to="/admin" />} />
          <Route path="/admin/dashboard/historicalRecords" element={isAuthenticated ? <HistoricalData /> : <Navigate to="/admin" />} /> {/* New route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
