import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TrainDetails from './components/TrainDetails';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Train Tracking System</h1>
      </header>
      <div className="App-content">
        <TrainDetails />
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
