import React from 'react';
import logo from './logo.svg';
import './App.css';
import Converter from './converter';
import ConverterHeader from './header';

function App() {
  return (
    <div>
      <div>
        <ConverterHeader /> 
      </div>
      <div>
        <Converter />
      </div>
    </div>
  );
}


export default App;
