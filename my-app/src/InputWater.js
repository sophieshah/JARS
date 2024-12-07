import React, { useState } from 'react';
import './App.css';
import axios from 'axios'

function InputWater() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [ounces, setOunces] = useState('');

  const username = localStorage.getItem('username');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (date && time && ounces && username) {
      const waterInfo = { date, time, ounces, username };

      try {
        const response = await axios.post('http://localhost:5050/water/add', waterInfo);
        console.log('Water entry added:', response.data);
        if (response.status === 201) {
          alert('Water entry saved successfully!');
          setDate('');
          setTime('');
          setOunces('');
        }
      } catch (error) {
        console.error('Failed to save water entry:', error);
        alert('Failed to save water entry. Please try again.');
      }
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="inputWater">
            <header className="App-header">
            <h1>Input Water</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Date:
                <input type="date" name="date" value={date}
              onChange={(e) => setDate(e.target.value)}/>
              </label>
              <br />
              <label>
                Time:
                <input type="time" name="time"value={time}
              onChange={(e) => setTime(e.target.value)} />
              </label>
              <br />
              <label>
                Ounces:
                <input type="number" name="ounces" value={ounces}
              onChange={(e) => setOunces(e.target.value)}/>
              </label>
              <br />
              <button className="App-button">Save</button>
            </form>
          </header>
      </div>      
  );
}

export default InputWater;
