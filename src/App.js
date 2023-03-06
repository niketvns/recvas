import React from 'react';
import { RecordView, Record, Navbar } from './components';
import './App.css';

const App = () => {
  return (
    <div className='main-body'>
      <Navbar />
      <Record />
    </div>
  )
}

export default App;