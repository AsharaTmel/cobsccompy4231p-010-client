import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import your CSS file
import App from './App'; // Import your main App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This should match the id in your index.html
);
