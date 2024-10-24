import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function LogIn() {
  return (
    <div className="Login">
            <header className="App-header">
            <h1>Log In</h1>
            <form>
              <label>
                Username:
                <input type="text" name="username" />
              </label>
              <br />
              <label>
                Password:
                <input type="password" name="password" />
              </label>
              <br />
              <Link to="/dashboard">
              <button className="App-button">Submit</button>
            </Link>
            </form>
          </header>
      </div>      
  );
}

export default LogIn;
