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
      year_of_manufacture: 2000,
    },
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://3.107.29.47:5001/api/engines/')
      .then(response => {
        setEngines(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the engine details!', error);
        setError('Error fetching engines');
      });
  }, []);

  const handleAddEngine = () => {
    axios.post('http://3.107.29.47:5001/api/engines/', newEngine)
      .then(response => {
        setEngines([...engines, response.data]);
        setNewEngine({
          engine_id: '',
          engine_number: '',
          other_details: {
            type: 'Diesel',
            capacity: '2600 HP',
            year_of_manufacture: 2000,
          },
        });
      })
      .catch(error => {
        console.error('There was an error adding the engine!', error);
        setError('Error adding engine');
      });
  };

  return (
    <div className="engine-details">
      <h2>Engine Details</h2>
      <table>
        <thead>
          <tr>
            <th>Engine ID</th>
            <th>Engine Number</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Year of Manufacture</th>
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
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add New Engine</h3>
      <input
        type="text"
        placeholder="Engine ID"
        value={newEngine.engine_id}
        onChange={(e) => setNewEngine({ ...newEngine, engine_id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Engine Number"
        value={newEngine.engine_number}
        onChange={(e) => setNewEngine({ ...newEngine, engine_number: e.target.value })}
      />
      <button onClick={handleAddEngine}>Add Engine</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default EngineDetails;
