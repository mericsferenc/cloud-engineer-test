import { Typography } from 'antd';
import React from 'react';
import './App.css';
import Cars from './components/Cars';

function App() {

  return (
    <div className="App">
      <Typography.Title>Cars CRUD API</Typography.Title>
      <Cars />
    </div>
  );
}

export default App;
