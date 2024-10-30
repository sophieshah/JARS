import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="Dashboard">
        <header className="App-header">
        <h1>
            Welcome to the dashboard.
        </h1>
        <Link to="/inputFood">
          <button className="App-button">Input Food</button>
        </Link>
        <Link to="/inputWater">
          <button className="App-button">Input Water</button>
        </Link>
        </header>
    </div>
  );
}

export default Dashboard;
