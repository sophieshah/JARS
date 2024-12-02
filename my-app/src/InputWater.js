import React, { useState } from 'react';
import './App.css';

function InputWater() {

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [ounces, setOunces] = useState('');

  const handleSubmit = (e) => {
    const waterInfo = JSON.parse(localStorage.getItem('waterInfo')) || [];

    if (date && time && ounces) {
      waterInfo.push({ date, time, ounces });
      localStorage.setItem('waterInfo', JSON.stringify(waterInfo));
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
