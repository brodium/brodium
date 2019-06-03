import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Dashboard from './Components/dashboard/Dashboard'
import LandingLogin from './Components/Landing/LandingLogin';

export default (
	<Switch>
		<Route exact path='/' component={Dashboard} />
		<Route path='/landing' component={LandingLogin} />
	</Switch>
)