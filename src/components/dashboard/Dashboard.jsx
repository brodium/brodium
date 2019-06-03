import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ChatWindow from './chatWindow/ChatWindow';
import AddChatRoom from './AddChatRoom/AddChatRoom';
// import { handleChatRoomClick } from './../../jacksonLogic/Functions'

const chatWindow = {
	display: 'flex',
	justifyContent: 'center',
	// border: 'solid black',
	width: '100vw'
}

const flex = {
	display: 'flex',
	flexDirection: 'row'
}

const sideBar = {
	width: '250px',
	borderRight: 'solid black .5px',
	margin: '0px 0px 0px 10px',
	height: '90vh',
	padding: '0px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between'
}

const h4 = {
	marginTop: '0',
	paddingTop: '20px'
}

function Dashboard(props) {

	const [company, setCompany] = useState([])
	let [displayChatRoom, setDisplayChatRoom] = useState(null) // props.google_places_id
	let [showAddRoom, setShowAddRoom] = useState(false)

	useEffect(() => {
		// const {companyId} = props

		let co_id = 1 // companyId // make this number dynamic when there is a session

		axios.get(`/rooms/${co_id}`).then( res => {
			setCompany(res.data)
		})
	}, [])
	console.log(company)

	const handleChatRoomClick = (id) => {
		// console.log(id)
		setDisplayChatRoom(displayChatRoom = id)
		console.log(displayChatRoom)
	}

	const handleAddingChatRoom = () => {
		setShowAddRoom(true)
		console.log(showAddRoom)
	}

	const renderEverything = () => {
		let co_id = 1
		axios.get(`/rooms/${co_id}`).then( res => {
			setCompany(res.data)
			setShowAddRoom(false)
		})
	}


	const chatRooms = company.map((el,i) => {
		return (
			<div key={i} onClick={() => handleChatRoomClick(el.chat_room_id)}>
				<h4 style={h4}> {el.title} </h4>
				<label> {el.description} </label>
				<div> <i className="far fa-edit"></i> <i className="far fa-trash-alt"></i> </div>
			</div>
		)
	})
	return (
		<div style={flex} className="main_sideBar">
			<div style={sideBar}>
				<div> {chatRooms} </div>
				<div> 
					<button onClick={() => handleAddingChatRoom()}> add Chat Room </button> 
				</div>
			</div>
			<div style={chatWindow} > 
				<ChatWindow /> 
			</div>
			{showAddRoom ? <AddChatRoom companyId={1} renderEverything={renderEverything} /> : null}
		</div>
	)
}

const mapStateToProps = (reduxState) => {
	const { companyId } = reduxState
	return {
		companyId
	}
}

export default connect(mapStateToProps)(Dashboard)