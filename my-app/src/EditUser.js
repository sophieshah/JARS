import React, { useState } from 'react';
import './App.css';

function EditUser() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goals, setGoals] = useState([
    { goal: '', timeframe: '' },
    { goal: '', timeframe: '' },
    { goal: '', timeframe: '' },
  ]);

  // Handle height and weight changes
  const handleHeightChange = (e) => setHeight(e.target.value);
  const handleWeightChange = (e) => setWeight(e.target.value);

  // Handle goal and timeframe changes
  const handleGoalChange = (index, value) => {
    const newGoals = [...goals];
    newGoals[index].goal = value;
    setGoals(newGoals);
  };

  const handleTimeframeChange = (index, value) => {
    const newGoals = [...goals];
    newGoals[index].timeframe = value;
    setGoals(newGoals);
  };

  // Save user data to localStorage
  const handleSave = (e) => {

    const userData = {
      height,
      weight,
      goals,
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    alert('User data saved successfully!');
  };

  return (
    <div className="editUser">
      <header className="App-header">
        <h1>Edit User Information</h1>
        <form onSubmit={handleSave}>
          <label>
            Height (in):
            <input
              type="number"
              name="height"
              value={height}
              onChange={handleHeightChange}
            />
          </label>
          <br />
          <label>
            Weight (lbs):
            <input
              type="number"
              name="weight"
              value={weight}
              onChange={handleWeightChange}
            />
          </label>
          <br />
          <h1>Edit Goals</h1>
          {goals.map((goalObj, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              Goal {index + 1}:
              <label>
                <select
                  name={`goal${index + 1}`}
                  value={goalObj.goal}
                  onChange={(e) => handleGoalChange(index, e.target.value)}
                >
                  <option value="">Select a Goal</option>
                  <option value="lose_weight">Lose Weight</option>
                  <option value="gain_muscle">Gain Muscle</option>
                  <option value="maintain_health">Maintain Health</option>
                </select>
              </label>
              <label>
                <select
                  name={`timeframe${index + 1}`}
                  value={goalObj.timeframe}
                  onChange={(e) => handleTimeframeChange(index, e.target.value)}
                >
                  <option value="">Select a Timeframe</option>
                  <option value="1_week">1 Week</option>
                  <option value="2_weeks">2 Weeks</option>
                  <option value="3_weeks">3 weeks</option>
                  <option value="1_month">1 month</option>
                </select>
              </label>
            </div>
          ))}
          <button type="submit" className="App-button">
            Save
          </button>
        </form>
      </header>
    </div>
  );
}

export default EditUser;
