import React, { useEffect, useState } from 'react';
import './TrainTable.css';


const TrainTable = ({ route }) => {
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/trains/route/${route.route_id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Expected data to be an array');
        }

        const trainDataPromises = data.map(async (train) => {
          const trainResponse = await fetch(`http://localhost:5001/api/fulltrains/train/${train.train_id}`);
          if (!trainResponse.ok) {
            throw new Error(`HTTP error! status: ${trainResponse.status}`);
          }
          const trainData = await trainResponse.json();
          const engineId = trainData[0].engine_id;

          const gpsResponse = await fetch(`http://localhost:5001/api/engines/${engineId}/realtime`);
          if (!gpsResponse.ok) {
            throw new Error(`HTTP error! status: ${gpsResponse.status}`);
          }
          const gpsData = await gpsResponse.json();

          return {
            ...train,
            direction: gpsData.direction,
            start_time: gpsData.start_time,
            start_station: gpsData.start_location,
            current_station: gpsData.current_location,
            estimated_end_time: gpsData.estimated_end_time,
            stations: gpsData.locations,
          };
        });

        const trainsWithGPSData = await Promise.all(trainDataPromises);
        setTrains(trainsWithGPSData);
      } catch (error) {
        console.error('Error fetching trains:', error);
        setError(error.message);
      }
    };

    fetchTrains();
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
            <th>Start Time</th>
            <th>Start Station</th>
            <th>Station 2</th>
            <th>Station 3</th>
            <th>Station 4</th>
            <th>Station 5</th>
            <th>Station 6</th>
            <th>Station 7</th>
            <th>Station 8</th>
            <th>Station 9</th>
            <th>Station 10</th>
            <th>End station</th>
            <th>Estimated End Time</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.train_id}>
              <td>{new Date(train.start_time).toLocaleString()}</td>
              <td>{train.start_station}</td>
              {train.stations.slice(1, 10).map((station, index) => (
                <td key={index}>{station.station} - {new Date(station.timestamp).toLocaleString()}</td>
              ))}
              {train.stations.length < 10 && Array.from({ length: 10 - train.stations.length }).map((_, index) => (
                <td key={`empty-${index}`}>N/A</td>
              ))}
              <td>{train.stations[train.stations.length - 1].station}</td>
              <td>{new Date(train.estimated_end_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainTable;
