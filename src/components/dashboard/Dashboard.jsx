import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ChatWindow from './chatWindow/ChatWindow';
import AddChatRoom from './AddChatRoom/AddChatRoom';
import EditChatRoom from './EditChatRoom/EditChatRoom';
// import { setUser, setCompany } from '../../mightyDucks/authReducer'
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
	let [unreadMessage, setUnreadMessage] = useState([])

	useEffect(() => {
		const { company_id } = props
		let co_id = company_id // make this number dynamic when there is a session
		// console.log('co_id', co_id)
		axios.get(`/rooms/${co_id}`).then(res => {
			setCompany(res.data)
		}).catch(console.log)
	}, [])
	console.log(company)

	useEffect(() => {
		const { company_id } = props
		let co_id = company_id // make this number dynamic when there is a session
		axios.get(`/rooms/${co_id}`).then(res => {
			setCompany(res.data)
		}).catch(console.log)
	}, [props.company_id])

	// UNREAD MESSAGES USEFFECT
	useEffect(() => {
		const { team_member_id } = props
		axios.get(`/unread-messages/${team_member_id}`).then(res => {
			setUnreadMessage(res.data)
		}).catch(err => console.log('didnt get unread messages', err))
	}, [])
	useEffect(() => {
		const { team_member_id } = props
		axios.get(`/unread-messages/${team_member_id}`).then(res => {
			setUnreadMessage(res.data)
		}).catch(err => console.log('didnt get unread messages', err))
	}, [props.team_member_id])
	// UNREAD MESSAGES USEEFFECT

	const handleDeleteChatRoom = (id) => {
		axios.delete(`/rooms/${id}`).then(res => {
			let co_id = props.company_id
			axios.get(`/rooms/${co_id}`).then(res => {
				setCompany(res.data)
			}).catch(console.log)
		}).catch(console.log)
	}

	const handleChatRoomClick = (id) => {
		const { team_member_id } = props
		console.log('team member', team_member_id)
		console.log('id passed in', id)
		setDisplayChatRoom(id)
		console.log(id)
		axios.delete(`/unread-messages/${team_member_id}/${id}`).then( res => {
			console.log(res.data)
		}).catch(err => console.log('frontend delete didnt work', err))
	}

	const handleAddingChatRoom = () => {
		setShowAddRoom(true)
		// console.log(showAddRoom)
	}

	const renderEverything = () => {
		let co_id = props.company_id
		axios.get(`/rooms/${co_id}`).then(res => {
			setCompany(res.data)
			setShowAddRoom(false)
		}).catch(console.log)
	}


	const chatRooms = company.map((el, i) => {
		return (
			<EditChatRoom
				key={el.chat_room_id}
				title={el.title}
				chat_room_id={el.chat_room_id}
				description={el.description}
				chatRoomClick={handleChatRoomClick}
				deleteChatRoom={handleDeleteChatRoom}
				showEditField={showEditField}
				setEditField={setEditField}
				setCompany={setCompany}
				unreadMessage={unreadMessage}
			/>
		)
	})
	return (
		<div style={flex} className="main_sideBar">
			<div style={sideBar}>
				<div> {chatRooms} </div>
				<div>
					<button onClick={() => handleAddingChatRoom()}> Add Chatroom </button>
				</div>
			</div>
			<div style={chatWindow} >
				{displayChatRoom && (
					<ChatWindow
						displayChatRoom={displayChatRoom}
						chat_room_id={company.chat_room_id}
					/>)
				}
			</div>
			{showAddRoom ? <AddChatRoom companyId={props.company_id} renderEverything={renderEverything} /> : null}
		</div>
	)
}

const mapStateToProps = (reduxState) => {
	const { company_id, team_member_id } = reduxState
	return {
		company_id,
		team_member_id
	}
}



export default connect(mapStateToProps)(Dashboard)