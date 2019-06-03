import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './Components/header/Header';
import './App.css';
import routes from './routes';
import store from './mightyDucks/store';
import LandingLogin from './Components/Landing/LandingLogin'

//Brodium is da Best

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Header />
          {/* <LandingLogin /> */}
        </div>
        {routes}
      </HashRouter>
    </Provider>
  );
}

export default App;
