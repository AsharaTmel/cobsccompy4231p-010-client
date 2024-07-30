import React from 'react';
import './TrainTable.css';

const TrainTable = ({ trains }) => {
  return (
    <table className="TrainTable">
      <thead>
        <tr>
          <th>Train Name</th>
          <th>Status</th>
          <th>Start Time</th>
          <th>Current Stop</th>
          <th>Next Stop</th>
          <th>End Time</th>
        </tr>
      </thead>
      <tbody>
        {trains.length > 0 ? (
          trains.map((train, index) => (
            <tr key={index}>
              <td>{train.trainName || 'No name'}</td>
              <td>{train.status || 'No status'}</td>
              <td>{train.startTime ? new Date(train.startTime).toLocaleString() : 'No start time'}</td>
              <td>{train.currentStop || 'No current stop'}</td>
              <td>{train.nextStop || 'No next stop'}</td>
              <td>{train.endTime ? new Date(train.endTime).toLocaleString() : 'No end time'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No trains available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TrainTable;
