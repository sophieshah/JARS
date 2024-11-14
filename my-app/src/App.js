

import React from 'react';
import logo from './jar.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link,useLocation } from 'react-router-dom';
import Navbar from "./Navbar.js"
import LogIn from './LogIn.js';
import Dashboard from './Dashboard.js'
import CreateAcct from './CreateAcct.js'
import InputFood from './InputFood.js';
import EditUser from './EditUser.js';
import InputWater from './InputWater.js';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {

// const Dashboard = () => <h2>Dashboard</h2>;
// const InputFood = () => <h2>About</h2>;
// const InputWater = () => <h2>Services</h2>;

const location = useLocation();
const hideNavbarPaths = ['/', '/login', '/createAcct'];

  return (
      <div className="App">
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
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
          <Route path="/editUser" element={<EditUser/>}/>
      </Routes>
      </div>
  );
}

export default App;
