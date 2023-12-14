// App.js
import React from 'react';
import './App.css';
import RatingWidget from './RatingWidget';
import WeatherForecast from './WeatherForecast';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          CSE 134B HW5 Components and Beyond in React
        </p>
        <RatingWidget />
        <WeatherForecast />
      </header>
    </div>
  );
}

export default App;

