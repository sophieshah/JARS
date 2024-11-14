import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function InputWater() {
  return (
    <div className="inputWater">
            <header className="App-header">
            <h1>Input Water</h1>
            <form>
              <label>
                Date:
                <input type="date" name="date" />
              </label>
              <br />
              <label>
                Time:
                <input type="time" name="time" />
              </label>
              <br />
              <label>
                Ounces:
                <input type="number" name="ounces" />
              </label>
              <br />
              <button className="App-button">Save</button>
            </form>
          </header>
      </div>      
  );
}

export default InputWater;
