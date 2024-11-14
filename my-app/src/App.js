

import React from 'react';
import logo from './jar.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from "./Navbar.js"
import LogIn from './LogIn.js';
import Dashboard from './Dashboard.js'
import CreateAcct from './CreateAcct.js'
import InputFood from './InputFood.js';
import InputWater from './InputWater.js';

function App() {

// const Dashboard = () => <h2>Dashboard</h2>;
// const InputFood = () => <h2>About</h2>;
// const InputWater = () => <h2>Services</h2>;

  return (
    <Router>
      <div className="App">
      <Navbar />
      <Routes>
      <Route path = "/"
        element ={
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className = "App-title"> Welcome to JARS!</h1>
            <p> JARS is a premier water and food tracker app. <br /> Please click the button below to get started.
            </p>
            <Link to="/login">
              <button className="App-button">
                Log In
              </button>
            </Link>
            
          </header>
        } />
          <Route path="/login" element={<LogIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createAcct" element={<CreateAcct />} />
          <Route path="/inputFood" element={<InputFood/>}/>
          <Route path="/inputWater" element={<InputWater/>}/>
      </Routes>
      {/* <Routes>
        
        </Routes> */}
      </div>
    </Router>
  );
}

export default App;
