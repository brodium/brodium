import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Components/dashboard/Dashboard'
import TeamMembers from "./Components/TeamMembers/TeamMembers"
import LandingLogin from './Components/Landing/LandingLogin';
import LoginForm from './Components/Landing/LoginForm'
import RegisterForm from './Components/Landing/RegisterForm'


export default (
	<Switch>
		<Route exact path='/' component={Dashboard} />
		<Route path="/team-members" component={TeamMembers} />
		<Route path='/landing' component={LandingLogin} />
		<Route path='/login' component={LoginForm} />
		<Route path='/register' component={RegisterForm} />
	</Switch>
)