import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Dashboard from './components/dashboard/Dashboard'

export default (
	<Switch>
		<Route exact path='/' component={Dashboard} />
	</Switch>
)