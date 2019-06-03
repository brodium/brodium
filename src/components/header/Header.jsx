import React from 'react';
import BrodiumLogo from './../../Assets/brodium002.png';

const fullHeader = {
	borderBottom: '.5px solid black',
	display: 'flex',
	justifyContent: 'space-between',
	height: '125px'
}

const img = {
	height: '105px'
}

const restOfLogo = {
	marginBottom: '10px',
	fontSize: '35px',
	fontWeight: '600'
}

const brodiumLogoDiv = {
	// border: '.5px solid black',
	margin: '5px 0px 5px 15px',
	padding: '5px'
}

const hamburger = {
	fontSize: '55px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-end',
	height: '100%',
	// border: 'solid black',
	margin: '0px 15px 10px 0px'
}

function Header(props) {

	return (
		<div className="fullHeader_div" style={fullHeader} >
			<div className="brodiumLogo_div" style={brodiumLogoDiv}>
				<img style={img} src={BrodiumLogo} alt='B for brodium' />
				<label style={restOfLogo}> rodium </label>
			</div>
			<div style={hamburger} className="hamburgerMenu_div"> 
				<i className="fas fa-bars"></i> 
			</div>
		</div>
	)
}

export default Header