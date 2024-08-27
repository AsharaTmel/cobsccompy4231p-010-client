import React, { useEffect, useState } from 'react';
import './AssignedEngines.css'; // Ensure this file has styles for the table
import Modal from '../Modal'; // Import the Modal component

const AssignedEngines = () => {
  const [trainEngines, setTrainEngines] = useState([]);
  const [trains, setTrains] = useState({});
  const [assignData, setAssignData] = useState({ train_id: '', engine_id: '' });
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://3.107.29.47:5001/api/fulltrains/')
      .then(response => response.json())
      .then(data => {
        setTrainEngines(data);
        data.forEach(item => {
          fetch(`http://3.107.29.47:5001/api/trains/${item.train_id}/`)
            .then(response => response.json())
            .then(train => {
              setTrains(prevTrains => ({
                ...prevTrains,
                [item.train_id]: train.train_name
              }));
            });
        });
      });
  }, []);

  const handleAssign = () => {
    const { train_id, engine_id } = assignData;

    if (!train_id || !engine_id) {
      setError('Both train_id and engine_id are required.');
      setModalOpen(true);
      return;
    }

    fetch('http://3.107.29.47:5001/api/fulltrains/train/assign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assignData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          setModalOpen(true);
        } else {
          setError('');
          setAssignData({ train_id: '', engine_id: '' });
          fetch('http://3.107.29.47:5001/api/fulltrains/')
            .then(response => response.json())
            .then(data => setTrainEngines(data));
        }
      });
  };

  const handleUnassign = (train_id) => {
    fetch(`http://3.107.29.47:5001/api/fulltrains/train/${train_id}/unassign`, {
      method: 'PATCH',
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          setModalOpen(true);
        } else {
          setError('');
          fetch('http://3.107.29.47:5001/api/fulltrains/')
            .then(response => response.json())
            .then(data => setTrainEngines(data));
        }
      });
  };

  const closeModal = () => {
    setModalOpen(false);
    setError('');
  };

  return (
    <div className="assigned-engines">
      <h2>Currently Assigned Engines</h2>
      <table className="train-details-table">
        <thead>
          <tr>
            <th>Full Train ID</th>
            <th>Train ID</th>
            <th>Train Name</th>
            <th>Engine ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainEngines.map(engine => (
            <tr key={engine._id}>
              <td>{engine.fulltrain_id}</td>
              <td>{engine.train_id}</td>
              <td>{trains[engine.train_id] || 'Loading...'}</td>
              <td>{engine.engine_id}</td>
              <td>
                <button onClick={() => handleUnassign(engine.train_id)}>Unassign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="assign-section">
        <h3>Assign Engine</h3>
        <input
          type="text"
          placeholder="Train ID"
          value={assignData.train_id}
          onChange={(e) => setAssignData({ ...assignData, train_id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Engine ID"
          value={assignData.engine_id}
          onChange={(e) => setAssignData({ ...assignData, engine_id: e.target.value })}
        />
        <button onClick={handleAssign}>Assign</button>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal} message={error} />
    </div>
  );
};

export default AssignedEngines;
