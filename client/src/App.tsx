import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Cars from './components/cars';

function App() {

  useEffect(() => {
    (async () => {
      const res = await axios.get('http://localhost:8080/api/');
      console.log(res.data);
    })();
  }, []);

  return (
    <div className="App">
      <Cars />
    </div>
  );
}

export default App;
