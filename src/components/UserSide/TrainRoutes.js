import React, { useEffect, useState } from 'react';
import TrainTable from './TrainTable';
import './TrainRoutes.css';

const TrainRoutes = () => {
  const [routeData, setRouteData] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const routes = [
        { route_id: 'R001', route_name: 'Up Country Line' },
        { route_id: 'R002', route_name: 'Coastal Line' },
        { route_id: 'R003', route_name: 'Main Line' },
        { route_id: 'R004', route_name: 'Northern Line' },
        { route_id: 'R005', route_name: 'Trincomalee Line' },
        { route_id: 'R006', route_name: 'Batticaloa Line' },
        { route_id: 'R008', route_name: 'Galle Line' },
        { route_id: 'R009', route_name: 'Vavuniya Line' },
        { route_id: 'R010', route_name: 'Kandy Line' },
      ];
      setRouteData(routes);
    };

    fetchRoutes();
  }, []);

  return (
    <div className="train-routes">
      <h1 className="page-heading">Train Tracking System</h1> {/* Added Page Heading */}
      {routeData.map((route) => (
        <TrainTable key={route.route_id} route={route} />
      ))}
    </div>
  );
};

export default TrainRoutes;
