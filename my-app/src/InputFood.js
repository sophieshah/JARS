import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function InputFood() {

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [calories, setCalories] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (date && time && calories && description) {
      const foodInfo = { date, time, calories, description };

      try {
        const response = await axios.post('http://localhost:5050/food/add', foodInfo);
        if (response.status === 201) {
          alert('Food entry saved successfully!');
          setDate('');
          setTime('');
          setCalories('');
          setDescription('');
        }
      } catch (error) {
        console.error('Failed to save food entry:', error);
        alert('Failed to save food entry. Please try again.');
      }
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
