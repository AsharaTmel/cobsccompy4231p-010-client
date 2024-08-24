// src/components/AdminSide/AdminDashboard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import TrainRoutes from '../UserSide/TrainRoutes';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleAssignTrainEnginesClick = () => {
    navigate('/admin/dashboard/assignedEngines');
  };

  const handleTrainDetailsClick = () => {
    navigate('/admin/dashboard/trainDetails');
  };

  const handleEngineDetailsClick = () => {
    navigate('/admin/dashboard/engineDetails');
  };

  const handleHistoricalRecordsClick = () => {
    navigate('/admin/dashboard/historicalRecords');
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="buttons">
        <button onClick={handleAssignTrainEnginesClick}>Assign Train Engines</button>
        <button onClick={handleTrainDetailsClick}>Train Details</button>
        <button onClick={handleEngineDetailsClick}>Engine Details</button>
        <button onClick={handleHistoricalRecordsClick}>Historical Records</button>
      </div>
      <div className="train-details">
        <TrainRoutes />
      </div>
    </div>
  );
};

export default AdminDashboard;
