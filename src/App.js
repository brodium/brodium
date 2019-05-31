import React from 'react';
import {HashRouter} from 'react-router-dom';
import Header from './Components/header/Header'

import './App.css';
import routes from './routes';

//Brodium is da Best

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
      </div>
        {routes}
    </HashRouter>
  );
}

export default App;
