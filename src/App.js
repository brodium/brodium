import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Header from './Components/header/Header';
import './App.css';
import routes from './routes';
import store from './mightyDucks/store';
import LandingLogin from './Components/Landing/LandingLogin'
import Axios from 'axios';
import { setUser, setCompany } from './mightyDucks/authReducer';

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
    <div className="App">
      <Header />
      {routes}
    </div>
  );
}

const mapDispatchToProps = {
  setCompany,
  setUser
}

export default connect(null, mapDispatchToProps)(withRouter(App));
