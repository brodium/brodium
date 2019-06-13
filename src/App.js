import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/header/Header';
import './App.scss';
import routes from './routes';
import Axios from 'axios';
import { setUser, setCompany } from './mightyDucks/authReducer';

//Brodium is da Best

function App(props) {

  useEffect(() => {
    Axios.get('/auth/session').then(res => {
      if (res.data.user) {
        props.setUser(res.data.user)
        props.setCompany(res.data.company)
      } else if (props.location.pathname === '/' || props.location.pathname === '/profile' || props.location.pathname === '/team-members') {
        props.history.push('/landing')
      }
    }).catch(console.log)
  }, [])

  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
}

const mapStateToProps = state => {
  const { firstname } = state
  return { firstname }
}

const mapDispatchToProps = {
  setCompany,
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
