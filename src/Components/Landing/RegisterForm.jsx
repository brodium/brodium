import React, { useState } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Place from './Place';
import { setUser, setCompany } from '../../mightyDucks/authReducer';
import { findCompany } from '../../ShawnsTests/utils';

function RegisterForm(props) {

	const [firstname, setFirstName] = useState('')
	const [lastname, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [place, setPlace] = useState('')

	const [company, setCompany] = useState('')
	const [state, setState] = useState('')
	const [city, setCity] = useState('')

	const [searchResults, setSearchResults] = useState([])

	const register = () => {
		const { formatted_address, name, place_id } = place
		Axios.post('/auth/register-company', {
			company: { company_name: name, address: formatted_address, google_places_id: place_id }
		})
			.then(company => {

				Axios.post('/auth/register-user', {
					user: { firstname, lastname, isadmin: true, email, password }
				})
					.then(user => {

						props.setCompany(company.data)
						props.setUser(user.data)
						props.history.push('/')
					}).catch(console.log)
			}).catch(console.log)
	}

	return (
		<div className="registerLandingComp">
			<h2>Register</h2>
			<div className='registerBox1'>

				<div className="user">
					<div className="user-inputs">
						<div className="user-input">
							<label htmlFor="firstname">First Name:</label>
							<input value={firstname} id='firstname' type="text" onChange={(e) => setFirstName(e.target.value)} />
						</div>
						<div className="user-input">
							<label htmlFor="lastname">Last Name:</label>
							<input value={lastname} id="lastname" type="text" onChange={(e) => setLastName(e.target.value)} />
						</div>
						<div className="user-input">
							<label htmlFor="email">Email:</label>
							<input value={email} id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
						</div>
						<div className="user-input">
							<label htmlFor="password">Password:</label>
							<input value={password} id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
						</div>
					</div>

					<div className="company-inputs">
						<div className="company-input">
							<label htmlFor="company">Company:</label>
							<input value={company} id="company" type="text" onChange={(e) => setCompany(e.target.value)} />
						</div>
						<div className="company-input">
							<label htmlFor="city">City:</label>
							<input value={city} id="city" type="text" onChange={(e) => setCity(e.target.value)} />
						</div>
						<div className="company-input">
							<label htmlFor="state">State:</label>
							<input value={state} id="state" type="text" onChange={(e) => setState(e.target.value)} />
						</div>
						<button onClick={async () => {
							setSearchResults(await findCompany(company, city, state))
						}}>Find Company
						</button>
						<p>please select your company below, before clicking on the register button</p>
					</div>
				</div>




				<button className="register-co-btn" onClick={register}>Register</button>

				<div className='companyMappedDisplayed'>
					{searchResults.map(place => (
						<div key={place.id} onClick={() => setPlace(place)}>
							<div className='companyBoxDisplayed'>
								<Place place={place} />
							</div>
						</div>
					))}
				</div>

			</div>
		</div>
	)
}

const mapDispatchToProps = {
	setCompany,
	setUser
}

export default connect(null, mapDispatchToProps)(withRouter(RegisterForm))