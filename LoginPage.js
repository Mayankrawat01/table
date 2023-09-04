import React, { useRef, useState } from 'react';
import './LoginPage.css'; 
import UserTable from './UserTable';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 const[isLoggedIn,setisLoggedIn] = useState(false);
const email = useRef();
const pass =useRef()
const getEmail = localStorage.getItem('EmailData')
const getpassword = localStorage.getItem('passData')
   const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const enteredEmail = email.current.value.trim(); 
    const enteredPassword = pass.current.value.trim();
    if(enteredEmail === 'mayank@gmail.com' && enteredPassword === '123456'){
localStorage.setItem('EmailData', 'mayank@gmail.com')
localStorage.setItem('passData', '123456')
setisLoggedIn(true);
    }
    

    }
  return (
    
    <div className="login-container">
  
 {getEmail && getpassword ? (
        <UserTable key="userTableKey" />
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              autoComplete='off'
              ref={email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              ref={pass}
              autoComplete='off'
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );

  };
export default LoginPage;
