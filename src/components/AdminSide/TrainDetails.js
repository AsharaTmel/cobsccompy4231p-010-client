import React, { useEffect, useState } from 'react';
import './TrainDetail.css';

const TrainDetail = ({ trainId }) => {
  const [train, setTrain] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://3.107.29.47:5001/api/trains/${trainId}`)
      .then(response => response.json())
      .then(data => setTrain(data))
      .catch(error => {
        console.error('Error fetching train details:', error);
        setError('Error fetching train details');
      });
  }, [trainId]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="train-detail">
      {train ? (
        <>
          <h2>Train Details</h2>
          <p>Train ID: {train.train_id}</p>
          <p>Train Name: {train.train_name}</p>
          <p>Engine ID: {train.engine_id}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TrainDetail;
