import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function InputFood() {
  return (
    <div className="inputFood">
            <header className="App-header">
            <h1>Input Food</h1>
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
                Calories:
                <input type="number" name="calories" />
              </label>
              <br />
              <label>
                Description:
                <input type="text" name="description" />
              </label>
              <br />
              <button className="App-button">Save</button>
            </form>
          </header>
      </div>      
  );
}

export default InputFood;
