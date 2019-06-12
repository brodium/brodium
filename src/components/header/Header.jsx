import React, { useState } from 'react';
import BrodiumLogo from './../../Assets/brodium002.png';
import Axios from 'axios';
import { connect } from 'react-redux';
import { clearUser } from './../../mightyDucks/authReducer';
import { Link, withRouter } from 'react-router-dom';

const fullHeader = {
	// borderBottom: '.5px solid black',
	display: 'flex',
	justifyContent: 'space-between',
	height: '125px'
}

const img = {
	height: '105px',
	marginBottom: '-6px',
	marginLeft: '-8px'
}

const restOfLogo = {
	margin: '0 0 10px -11px',
	fontSize: '45px',
	fontWeight: '600'
}

const brodiumLogoDiv = {
	// border: '1px solid red',
	margin: '5px 0px 5px 0',
	padding: '5px'
}

const hamburger = {
	fontSize: '55px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-end',
	height: '100%',
	// border: 'solid black',
	margin: '0 0 10px 0',
	color: '#414141',
	cursor: 'pointer'
}

function Header(props) {
	const [showMenu, setShowMenu] = useState(false)

	const handleMenu = () => {
		setShowMenu(!showMenu)
	}

	const logout = () => {
		// console.log(props.clearUser)
		Axios.get('/auth/logout').then(res => {
			props.clearUser()
			props.history.push('/landing')
			setShowMenu(false)
		}).catch(err => console.log('logout didnt work', err))
	}

	const handleShowMeauState = () => {
		setShowMenu(!showMenu)
	}

	return (
		<div className="fullHeader_div" style={fullHeader} >
			<div className="brodiumLogo_div" style={brodiumLogoDiv}>
				<img style={img} src={BrodiumLogo} alt='B for brodium' />
				<label style={restOfLogo}> rodium </label>
			</div>
			<div style={hamburger} className="hamburgerMenu_div">
				<i className="fas fa-bars" onClick={() => handleMenu()} ></i>
				{!showMenu ? null :
					<div className="hamyMenu_div">
						<ul className="unOrderedList_header">
							<Link className="link" to='/'> <li onClick={() => handleShowMeauState()}> Dashboard </li> </Link>
							<Link className="link" to='/profile'> <li onClick={() => handleShowMeauState()}> Profile </li> </Link>
							<Link className="link" to='/team-members'> <li onClick={() => handleShowMeauState()}> Team Members </li> </Link>
							<li onClick={() => logout()} > Logout </li>
						</ul>
					</div>
				}
			</div>
		</div>
	)
}

const mapDispatchToProps = {
	clearUser
}

export default withRouter(connect(null, mapDispatchToProps)(Header))