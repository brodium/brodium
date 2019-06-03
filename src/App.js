<<<<<<< HEAD
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
=======
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
>>>>>>> master

import Header from './Components/header/Header';
import './App.css';
import routes from './routes';
<<<<<<< HEAD
import store from './mightyDucks/store';
import LandingLogin from './Components/Landing/LandingLogin'
=======
import Axios from 'axios';
import {setUser, setCompany} from './mightyDucks/authReducer';
>>>>>>> master

//Brodium is da Best

function App(props) {

  useEffect(() => {
    Axios.get('/auth/session').then(res => {
      if (!res.data) {
        props.history.push('/landing')
      } else {
        props.setUser(res.data.user)
        props.setCompany(res.data.company)
      }
    })
  }, [])

  return (
<<<<<<< HEAD
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Header />
          {/* <LandingLogin /> */}
        </div>
        {routes}
      </HashRouter>
    </Provider>
=======
      <div className="App">
        <Header />
        {routes}
      </div>
>>>>>>> master
  );
}

const mapDispatchToProps = {
  setCompany,
  setUser
}

export default connect(null, mapDispatchToProps)(withRouter(App));
