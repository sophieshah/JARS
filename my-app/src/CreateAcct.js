import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function CreateAcct() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Retrieve existing accounts from localStorage
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    if (username && password) {
      // Add the new account to the list
      accounts.push({ username, password });

      // Save updated accounts list to localStorage
      localStorage.setItem('accounts', JSON.stringify(accounts));

      alert('Account created successfully!');
      navigate('/login'); // Redirect to login page
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="CreateAcct">
      <header className="App-header">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit" className="App-button">
            Submit
          </button>
        </form>
      </header>
    </div>
  );
}

export default CreateAcct;
