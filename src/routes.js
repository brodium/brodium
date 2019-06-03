import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './Components/dashboard/Dashboard'
<<<<<<< HEAD
=======
import TeamMembers from "./Components/TeamMembers/TeamMembers"
>>>>>>> master
import LandingLogin from './Components/Landing/LandingLogin';

export default (
	<Switch>
		<Route exact path='/' component={Dashboard} />
<<<<<<< HEAD
=======
		<Route path="/team-members" component={TeamMembers} />
>>>>>>> master
		<Route path='/landing' component={LandingLogin} />
	</Switch>
)