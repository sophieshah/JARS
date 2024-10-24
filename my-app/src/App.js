import logo from './jar.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LogIn from './LogIn.js';
import Dashboard from './Dashboard.js'

function App() {
  // const handleClick = () => {
  //   alert("Button Clicked!");
  // };
  return (
    <Router>
      <div className="App">
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
