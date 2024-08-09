import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import TrainRoutes from '../TrainRoutes'; // Update the import path if necessary
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate(); // Create a navigate function

  // Handler function for the "Assign Train Engines" button
  const handleAssignTrainEnginesClick = () => {
    navigate('/admin/dashboard/assignedEngines');
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="buttons">
        <button onClick={handleAssignTrainEnginesClick}>Assign Train Engines</button>
        <button>Train Details</button>
        <button>Engine Details</button>
        <button>Full Trains</button>
      </div>
      <div className="train-details">
        <TrainRoutes /> {/* Replace TrainDetails with TrainRoutes */}
      </div>
    </div>
  );
};

export default AdminDashboard;
