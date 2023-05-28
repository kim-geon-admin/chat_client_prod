import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom';

import {userContext} from './provider/userContext.js'
import userClassObject from './class/userClass.js';

import LogIn from './login/Login.js';
import Chat from './main/chat.js';
import './App.css';



function App() {
  let userClass = new userClassObject('');

  return (
    <userContext.Provider  value={userClass}>
      <Router>
        <Routes>
          <Route path="/main" exact  element={<Chat/>} />
          <Route path="/"  element={<LogIn/>} />
        </Routes>
      </Router>
  </userContext.Provider>
  );
}

export default App;