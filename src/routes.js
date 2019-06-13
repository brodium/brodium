import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import TeamMembers from "./components/TeamMembers/TeamMembers";
import LandingLogin from './components/Landing/LandingLogin';
import LoginForm from './components/Landing/LoginForm';
import RegisterForm from './components/Landing/RegisterForm';
import Profile from './components/Profile/Profile';
import OnBoarding from './components/Profile/OnBoardingTeamMember';

export default (
	<Switch>
		<Route exact path='/' component={Dashboard} />
		<Route path="/team-members" component={TeamMembers} />
		<Route path='/landing' component={LandingLogin} />
		<Route path='/login' component={LoginForm} />
		<Route path='/register' component={RegisterForm} />
		<Route path='/profile' component={Profile} />
		<Route path='/onboarding/:team_member_id' component={OnBoarding} />
	</Switch>
)