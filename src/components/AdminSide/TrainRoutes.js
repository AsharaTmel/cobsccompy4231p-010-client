import React, { useEffect, useState } from 'react';
import TrainTable from './TrainTable';  // Ensure the correct path
import './TrainRoutes.css';

const TrainRoutes = () => {
  const [routeData, setRouteData] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const routes = [
        { route_id: 'R001', route_name: 'Colombo to Badulla' },
        { route_id: 'R002', route_name: 'Colombo to Kandy' },
        { route_id: 'R003', route_name: 'Colombo to Jaffna' },
        { route_id: 'R004', route_name: 'Colombo to Galle' },
        { route_id: 'R005', route_name: 'Colombo to Matara' },
        { route_id: 'R006', route_name: 'Kandy to Nanu Oya' },
        //{ route_id: 'R007', route_name: 'Galle to Matara' },
        { route_id: 'R008', route_name: 'Polgahawela to Colombo' },
        { route_id: 'R009', route_name: 'Colombo to Trincomalee' },
        { route_id: 'R010', route_name: 'Batticaloa to Colombo' },
      ];
      setRouteData(routes);
    };

    fetchRoutes();
  }, []);

  return (
    <div className="train-routes">
      {routeData.map((route) => (
        <TrainTable key={route.route_id} route={route} />
      ))}
    </div>
  );
};

export default TrainRoutes;
