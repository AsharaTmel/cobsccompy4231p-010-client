import React, { useEffect, useState } from 'react';
import './TrainTable.css';

const TrainTable = ({ route }) => {
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState(null);

  const fetchTrainData = async () => {
    try {
      const response = await fetch(`http://3.107.29.47:5001/api/trains/route/${route.route_id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Expected data to be an array');
      }

      const trainDataPromises = data.map(async (train) => {
        const trainResponse = await fetch(`http://3.107.29.47:5001/api/fulltrains/train/${train.train_id}`);
        if (!trainResponse.ok) {
          throw new Error(`HTTP error! status: ${trainResponse.status}`);
        }
        const trainData = await trainResponse.json();
        const engineId = trainData[0]?.engine_id;

        if (!engineId) {
          throw new Error('Engine ID not found');
        }

        const gpsResponse = await fetch(`http://3.107.29.47:5001/api/engines/${engineId}/realtime`);
        if (!gpsResponse.ok) {
          throw new Error(`HTTP error! status: ${gpsResponse.status}`);
        }
        const gpsData = await gpsResponse.json();

        return {
          ...train,
          train_name: train.train_name,
          direction: gpsData.direction,
          current_station: gpsData.current_location || 'N/A',  // Directly use current_location
          stations: gpsData.locations || [],
        };
      });

      const trainsWithGPSData = await Promise.all(trainDataPromises);
      setTrains(trainsWithGPSData);
    } catch (error) {
      console.error('Error fetching trains:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchTrainData();
    const intervalId = setInterval(fetchTrainData, 60000); // 60000 ms = 60 seconds

    return () => clearInterval(intervalId);
  }, [route.route_id]);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="train-table">
      <h3>{route.route_name}</h3>
      <table>
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Direction</th>
            <th>Current Station</th>
            <th>Station 1</th>
            <th>Station 2</th>
            <th>Station 3</th>
            <th>Station 4</th>
            <th>Station 5</th>
            <th>Station 6</th>
            <th>Station 7</th>
            <th>Station 8</th>
            <th>Station 9</th>
            <th>Station 10</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.train_id}>
              <td>{train.train_name}</td>
              <td>{train.direction}</td>
              <td>{train.current_station}</td>
              {train.stations.slice(0, 10).map((station, index) => (
                <td key={index}>{station.station} - {new Date(station.timestamp).toLocaleString()}</td>
              ))}
              {train.stations.length < 10 && Array.from({ length: 10 - train.stations.length }).map((_, index) => (
                <td key={`empty-${index}`}>N/A</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainTable;
