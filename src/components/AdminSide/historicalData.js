// historicalData.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './historicalData.css';

const HistoricalData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch historical data when component mounts
    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get('/api/historical-data');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, []);

  if (loading) {
    return <div className="admin-container">Loading...</div>;
  }

  if (error) {
    return <div className="admin-container">Error: {error}</div>;
  }

  return (
    <div className="admin-container">
      <h1>Historical Data</h1>
      {data.length === 0 ? (
        <div className="no-data">No historical data available</div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Engine ID</th>
                <th>Train Name</th>
                <th>Direction</th>
                <th>Start Time</th>
                <th>Start Location</th>
                <th>Current Location</th>
                <th>Estimated End Time</th>
                <th>Locations</th>
              </tr>
            </thead>
            <tbody>
              {data.map((record, index) => (
                <tr key={index}>
                  <td>{record.engine_id}</td>
                  <td>{record.train_name}</td>
                  <td>{record.direction}</td>
                  <td>{new Date(record.start_time).toLocaleString()}</td>
                  <td>{record.start_location}</td>
                  <td>{record.current_location}</td>
                  <td>{new Date(record.estimated_end_time).toLocaleString()}</td>
                  <td>
                    {record.locations.map((location, locIndex) => (
                      <div key={locIndex}>
                        {location.station}: {new Date(location.timestamp).toLocaleString()}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoricalData;
