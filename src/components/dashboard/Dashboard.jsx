import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ChatWindow from './chatWindow/ChatWindow';
import AddChatRoom from './AddChatRoom/AddChatRoom';
import EditChatRoom from './EditChatRoom/EditChatRoom';
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

function Dashboard(props) {

	const [company, setCompany] = useState([])
	let [displayChatRoom, setDisplayChatRoom] = useState(null) // props.google_places_id
	let [showAddRoom, setShowAddRoom] = useState(false)
	let [showEditField, setEditField] = useState(false)

	useEffect(() => {
		const {company_id} = props

		let co_id = company_id // make this number dynamic when there is a session
		console.log('co_id',co_id)
		axios.get(`/rooms/${co_id}`).then( res => {
			setCompany(res.data)
		})
	}, [])

	const handleDeleteChatRoom = (id) => {
		axios.delete(`/rooms/${id}`).then( res => {
			let co_id = props.company_id
			axios.get(`/rooms/${co_id}`).then( res => {
				setCompany(res.data)
			})
		})
	}

	const handleChatRoomClick = (id) => {
		setDisplayChatRoom(displayChatRoom = id)
		console.log(displayChatRoom)
	}

	const handleAddingChatRoom = () => {
		setShowAddRoom(true)
		console.log(showAddRoom)
	}

	const renderEverything = () => {
		let co_id = props.company_id
		axios.get(`/rooms/${co_id}`).then( res => {
			setCompany(res.data)
			setShowAddRoom(false)
		})
	}


	const chatRooms = company.map((el,i) => {
		return (
			<EditChatRoom 
				key={el.chat_room_id} title={el.title} chat_room_id={el.chat_room_id} 
				description={el.description} chatRoomClick={handleChatRoomClick}
				deleteChatRoom={handleDeleteChatRoom} 
				showEditField={showEditField}
				setEditField={setEditField} setCompany={setCompany} />
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
			{showAddRoom ? <AddChatRoom companyId={props.company_id} renderEverything={renderEverything} /> : null}
		</div>
	)
}

const mapStateToProps = (reduxState) => {
	const { company_id } = reduxState
	return {
		company_id
	}
}

export default connect(mapStateToProps)(Dashboard)