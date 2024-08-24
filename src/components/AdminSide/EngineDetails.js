import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EngineDetails.css';

const EngineDetails = () => {
  const [engines, setEngines] = useState([]);
  const [newEngine, setNewEngine] = useState({
    engine_id: '',
    engine_number: '',
    other_details: {
      type: 'Diesel',
      capacity: '2600 HP',
      year_of_manufacture: 2015
    }
  });
  const [error, setError] = useState(''); // Add this line for error handling

  useEffect(() => {
    // Fetch all engines on component mount
    const fetchEngines = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/engines');
        setEngines(response.data);
      } catch (error) {
        console.error('Error fetching engine data:', error.message);
        setError('Failed to fetch engine data.'); // Set error message
      }
    };
    fetchEngines();
  }, []);

  // Handle input change for the new engine form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEngine(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle adding a new engine
  const handleAddEngine = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/engines', newEngine);
      setEngines([...engines, response.data]);
      setNewEngine({
        engine_id: '',
        engine_number: '',
        other_details: {
          type: 'Diesel',
          capacity: '2600 HP',
          year_of_manufacture: 2015
        }
      });
    } catch (error) {
      console.error('Error adding engine:', error.message);
      setError('Failed to add engine.'); // Set error message
    }
  };

  // Handle deleting an engine
  const handleDeleteEngine = async (engine_id) => {
    try {
      await axios.delete(`http://localhost:5001/api/engines/${engine_id}`);
      setEngines(engines.filter(engine => engine.engine_id !== engine_id));
    } catch (error) {
      console.error('Error deleting engine:', error.message);
      setError('Failed to delete engine.'); // Set error message
    }
  };

  return (
    <div className="engine-details-container">
      <h2>Engine Details</h2>
      <table className="engine-details-table">
        <thead>
          <tr>
            <th>Engine ID</th>
            <th>Engine Number</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Year of Manufacture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {engines.map(engine => (
            <tr key={engine.engine_id}>
              <td>{engine.engine_id}</td>
              <td>{engine.engine_number}</td>
              <td>{engine.other_details.type}</td>
              <td>{engine.other_details.capacity}</td>
              <td>{engine.other_details.year_of_manufacture}</td>
              <td>
                <button onClick={() => handleDeleteEngine(engine.engine_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="assign-section">
        <h3>Add New Engine</h3>
        <form onSubmit={handleAddEngine}>
          <input
            type="text"
            name="engine_id"
            placeholder="Engine ID"
            value={newEngine.engine_id}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="engine_number"
            placeholder="Engine Number"
            value={newEngine.engine_number}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="other_details.type"
            placeholder="Type (Diesel/Electric)"
            value={newEngine.other_details.type}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="other_details.capacity"
            placeholder="Capacity"
            value={newEngine.other_details.capacity}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="other_details.year_of_manufacture"
            placeholder="Year of Manufacture"
            value={newEngine.other_details.year_of_manufacture}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Engine</button>
        </form>
      </div>

      {/* Display error message if any */}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default EngineDetails;
