import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TrainDetails.css'; // Updated CSS for styling

const TrainDetails = () => {
  const [trains, setTrains] = useState([]);
  const [newTrain, setNewTrain] = useState({
    train_name: '',
    train_id: '',
    route_id: '',
    stations: '',
    direction: '' // Add direction field
  });

  useEffect(() => {
    // Fetch all trains on component mount
    const fetchTrains = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/trains');
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching train data:', error.message);
      }
    };
    fetchTrains();
  }, []);

  // Handle input change for the new train form
  const handleInputChange = (e) => {
    setNewTrain({ ...newTrain, [e.target.name]: e.target.value });
  };

  // Handle adding a new train
  const handleAddTrain = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/trains', newTrain);
      setTrains([...trains, response.data]);
      setNewTrain({ train_name: '', train_id: '', route_id: '', stations: '', direction: '' }); // Reset form
    } catch (error) {
      console.error('Error adding train:', error.message);
    }
  };

  // Handle deleting a train
  const handleDeleteTrain = async (train_id) => {
    try {
      await axios.delete(`http://localhost:5001/api/trains/${train_id}`);
      setTrains(trains.filter(train => train.train_id !== train_id));
    } catch (error) {
      console.error('Error deleting train:', error.message);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Train Details</h2>
      <div className="train-table">
        <table>
          <thead>
            <tr>
              <th>Train Name</th>
              <th>Train ID</th>
              <th>Route ID</th>
              <th>Stations</th>
              <th>Direction</th> {/* Add direction column */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trains.map(train => (
              <tr key={train.train_id}>
                <td>{train.train_name}</td>
                <td>{train.train_id}</td>
                <td>{train.route_id}</td>
                <td>{train.stations.join(', ')}</td>
                <td>{train.direction}</td> {/* Display direction */}
                <td>
                  <button onClick={() => handleDeleteTrain(train.train_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="add-train-form">
        <h3>Add New Train</h3>
        <form onSubmit={handleAddTrain}>
          <input
            type="text"
            name="train_name"
            placeholder="Train Name"
            value={newTrain.train_name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="train_id"
            placeholder="Train ID"
            value={newTrain.train_id}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="route_id"
            placeholder="Route ID"
            value={newTrain.route_id}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="stations"
            placeholder="Stations (comma separated)"
            value={newTrain.stations}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="direction"
            placeholder="Direction"
            value={newTrain.direction}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Train</button>
        </form>
      </div>
    </div>
  );
};

export default TrainDetails;
