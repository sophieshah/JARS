import React, { useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5050/users/login", {
        username,
        password,
      });

      if (response.status === 200) {
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Invalid username or password.');
      } else {
        alert('Server error. Please try again later.');
      }
    }
  };

    return (
    <div className="Login">
            <header className="App-header">
            <h1>Log In</h1>
            <form onSubmit={handleLogin}>
              <label>
                Username:
                <input type="text" name="username" value={username}
                onChange={(e) => setUsername(e.target.value)}/>
              </label>
              <br />
              <label>
                Password:
                <input type="password" name="password" value={password}
                onChange={(e) => setPassword(e.target.value)} />
              </label>
              <br />
              <button className="App-button">Submit</button>
            <p>New to JARS? Create your account below:</p>
            <Link to="/createAcct">
              <button className="App-button">Create Account</button>
            </Link>
            </form>
          </header>
      </div>      
  );

}

export default LogIn;


// import React, {useState} from 'react';
// import './App.css';
// import { Link, useNavigate } from 'react-router-dom';

// function LogIn() {
  
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
  
//     // Retrieve stored accounts from localStorage
//     const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
  
//     // Check if the entered username and password match any stored account
//     const isValidAccount = accounts.some(
//       (account) => account.username === username && account.password === password
//     );
  
//     if (isValidAccount) {
//       navigate('/dashboard'); // Redirect to dashboard
//     } else {
//       alert('Invalid username or password.');
//     }
//   };
  
  
//   return (
//     <div className="Login">
//             <header className="App-header">
//             <h1>Log In</h1>
//             <form onSubmit={handleLogin}>
//               <label>
//                 Username:
//                 <input type="text" name="username" value={username}
//                 onChange={(e) => setUsername(e.target.value)}/>
//               </label>
//               <br />
//               <label>
//                 Password:
//                 <input type="password" name="password" value={password}
//                 onChange={(e) => setPassword(e.target.value)} />
//               </label>
//               <br />
//               <button className="App-button">Submit</button>
//             <p>New to JARS? Create your account below:</p>
//             <Link to="/createAcct">
//               <button className="App-button">Create Account</button>
//             </Link>
//             </form>
//           </header>
//       </div>      
//   );
// }

// export default LogIn;
