import React,  { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';



function EditUser() {
    const [goals, setGoals] = useState([
        { goal: '', timeframe: '' },
        { goal: '', timeframe: '' },
        { goal: '', timeframe: '' }
      ]);
    
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
    
      return (
        <div className="editUser">
          <header className="App-header">
            <h1>Edit User Information</h1>
            <form>
              <label>
                Height (in):
                <input type="number" name="height" />
              </label>
              <br />
              <label>
                Weight (lbs):
                <input type="number" name="weight" />
              </label>
              <br />
              <label>
                Username:
                <input type="text" name="username" />
              </label>
              <br />
              <label>
                Password:
                <input type="text" name="password" />
              </label>
              <br />
              <button className="App-button">Save</button>
            </form>
    
            <h1>Edit Goals</h1>
            <form>
              {goals.map((goalObj, index) => (
                <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
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
                      <option value="increase_endurance">Increase Endurance</option>
                    </select>
                  </label>
    
                  <label>
                    <select
                      name={`timeframe${index + 1}`}
                      value={goalObj.timeframe}
                      onChange={(e) => handleTimeframeChange(index, e.target.value)}
                    >
                      <option value="">Select a Timeframe</option>
                      <option value="1_month">1 Month</option>
                      <option value="3_months">3 Months</option>
                      <option value="6_months">6 Months</option>
                      <option value="1_year">1 Year</option>
                    </select>
                  </label>
                </div>
              ))}
              <button className="App-button">Save</button>
            </form>
          </header>
        </div>
      );
}

export default EditUser;