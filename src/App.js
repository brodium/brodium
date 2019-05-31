import React from 'react';
import {HashRouter} from 'react-router-dom';
import Header from './components/header/Header'

import './App.css';
import routes from './routes';

//Brodium is da Best

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        {routes}
      </div>
    </HashRouter>
  );
}

export default App;
