import React, { useState } from 'react';
import './App.css';

function InputFood() {

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [calories, setCalories] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    const foodInfo = JSON.parse(sessionStorage.getItem('foodInfo')) || [];

    if (date && time && calories && description) {
      foodInfo.push({ date, time, calories, description });
      sessionStorage.setItem('foodInfo', JSON.stringify(foodInfo));
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="inputFood">
            <header className="App-header">
            <h1>Input Food</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Date:
                <input type="date" name="date" value={date}
              onChange={(e) => setDate(e.target.value)}/>
              </label>
              <br />
              <label>
                Time:
                <input type="time" name="time" value={time}
              onChange={(e) => setTime(e.target.value)}/>
              </label>
              <br />
              <label>
                Calories:
                <input type="number" name="calories" value={calories}
              onChange={(e) => setCalories(e.target.value)}/>
              </label>
              <br />
              <label>
                Description:
                <input type="text" name="description" value={description}
              onChange={(e) => setDescription(e.target.value)}/>
              </label>
              <br />
              <button className="App-button">Save</button>
            </form>
          </header>
      </div>      
  );
}

export default InputFood;
