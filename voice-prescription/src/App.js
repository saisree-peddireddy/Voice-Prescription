import React from 'react';
import './App.css';
import Navbar from './Components/NavigationBar';
import { Router, Route } from 'react-router';
import Home from './Components/Home';
import Prescription from './Components/Prescription';
import { BrowserRouter } from 'react-router-dom'
import NavigationBar from './Components/NavigationBar';

function App() {
  return (
    
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
      
    
  );
}

export default App;
