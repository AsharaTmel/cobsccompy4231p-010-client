import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrainTable from './TrainTable';
import './TrainRoutes.css';

const TrainRoutes = () => {
  const [trainData, setTrainData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5001/api/trains') // Ensure this matches your backend endpoint
      .then(response => {
        console.log("Fetched train data:", response.data); // Debug log
        setTrainData(removeDuplicates(response.data));
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the train data!", error);
        setLoading(false);
      });
  }, []);

  const removeDuplicates = (arr) => {
    const seen = new Set();
    return arr.filter(item => {
      const key = `${item.trainName}-${item.route}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  };

  const filterTrainsByRoute = (route) => {
    return trainData.filter(train => train.route === route);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="TrainRoutes">
      <h2>Main Line</h2>
      <TrainTable trains={filterTrainsByRoute('Main Line')} />
      
      <h2>Coast Line</h2>
      <TrainTable trains={filterTrainsByRoute('Coast Line')} />
      
      {/* Remove the Southern Line table */}
      
      <h2>Northern Line</h2>
      <TrainTable trains={filterTrainsByRoute('Northern Line')} />
      
      <h2>Up Country Line</h2>
      <TrainTable trains={filterTrainsByRoute('Up Country Line')} />
      
      <h2>Batticaloa Line</h2>
      <TrainTable trains={filterTrainsByRoute('Batticaloa Line')} />
      
      <h2>Intermediate Routes</h2>
      <TrainTable trains={filterTrainsByRoute('Intermediate Routes')} />
    </div>
  );
};

export default TrainRoutes;
