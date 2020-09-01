import React from 'react';
import logo from './logo.svg';
import './styles.css';
import Converter from './converter';
import ConverterHeader from './header';

function App() {
  return (
    <div className="container">
      <div>
        <ConverterHeader /> 
      </div>
      <div className="inc-exp-container">
        <Converter />
      </div>
    </div>
  );
}


export default App;
