import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TrainRoutes from './TrainRoutes';
import AdminDashboard from './AdminSide/AdminDashboard';
import Login from './AdminSide/Login';
import AssignedEngines from './AdminSide/AssignedEngines'; // Import the new component
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TrainRoutes />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/assignedEngines" element={<AssignedEngines />} /> {/* Add this route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
