import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './Components/dashboard/Dashboard'
import TeamMembers from "./Components/TeamMembers/TeamMembers"

export default (
	<Switch>
		<Route exact path='/' component={Dashboard} />
		<Route path="/team-members" component={TeamMembers} />
	</Switch>
)