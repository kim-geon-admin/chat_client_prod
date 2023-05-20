import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom';


import LogIn from './login/Login.js';
import Chat from './main/chat.js';
import './App.css';



function App() {

  return (
   
  <Router>
    <Routes>
      <Route path="/main" exact  element={<Chat/>} />
      <Route path="/"  element={<LogIn/>} />
    </Routes>
    </Router>
  );
}

export default App;