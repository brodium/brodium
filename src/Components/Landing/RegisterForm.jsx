import React, { useState } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../App.scss'

import Place from './Place';
import { setUser, setCompany } from '../../mightyDucks/authReducer';

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

	const findCompany = () => {
		Axios.get(`/places/search/${company} ${city} ${state}`)
			.then(res => {
				setSearchResults(res.data.results)
			}).catch(console.log)
	}

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
					})
			})
	}

	return (
		<div className="registerLandingComp">
			<div className='registerBox1'>
				<div>


					<h2>Register</h2>
					<div className="inputs">
						<label htmlFor="firstname">First Name:</label>
						<input value={firstname} id='firstname' type="text" onChange={(e) => setFirstName(e.target.value)} />
					</div>

					<div className="inputs">
						<label htmlFor="lastname">Last Name:</label>
						<input value={lastname} id="lastname" type="text" onChange={(e) => setLastName(e.target.value)} />
					</div>

					<div className="inputs">
						<label htmlFor="email">Email:</label>
						<input value={email} id="email" type="text" onChange={(e) => setEmail(e.target.value)} />
					</div>

					<div className="inputs">
						<label htmlFor="password">Password:</label>
						<input value={password} id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
					</div>

					{/* <div className='registerBox2'>
					</div> */}


					<div className="inputs">

						<label htmlFor="company">Company:</label>
						<input value={company} id="company" type="text" onChange={(e) => setCompany(e.target.value)} />
						<div>
						</div>
						<div className="inputs">

							<label htmlFor="city">City:</label>
							<input value={city} id="city" type="text" onChange={(e) => setCity(e.target.value)} />
						</div>

					</div>
					<div>
						<div className="inputs">
							<div>

								<label htmlFor="state">State:</label>
								<input value={state} id="state" type="text" onChange={(e) => setState(e.target.value)} />

							</div>
						</div>
						<button onClick={findCompany}>Find Company</button>
					</div>


					<button onClick={register}>Register</button>
				</div>


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