import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client'
import Axios from 'axios';
import { connect } from 'react-redux'
import Messages from './Messages';


function ChatWindow(props) {
	// const [room, setRoom] = useState(props.displayChatRoom)
	const [messages, setMessages] = useState([])
	const [messageInput, setMessageInput] = useState('')
	const [socket, setSocket] = useState(null)

	const { firstname, lastname, company_id, img } = props

	const messagesEndRef = useRef(null)

	const scrollToBottom = () => { messagesEndRef.current.scrollIntoView({ behavior: "smooth" }) }

	useEffect(() => { scrollToBottom() }, [messages])

	useEffect(() => {
		Axios.get(`/messages/${props.displayChatRoom}`).then(res => {
			setMessages(res.data)
		})
	}, [])

	useEffect(() => {
		// setRoom(props.displayChatRoom)
		Axios.get(`/messages/${props.displayChatRoom}`).then(res => {
			// console.log(res.data)
			setMessages(res.data)
		})
	}, [props.displayChatRoom])

	useEffect(() => {
		const socket = io.connect(':4444')
		setSocket(socket)
		socket.emit('socket room', company_id)
		socket.on('socket room message', messageReceiver)

		return () => {
			socket.emit('leave socket room', props.company_id)
		}
	}, [])
	
	const messageReceiver = data => {
		// make logic to show the message or not based off of the company id
		// console.log(data)
		if (data.room === props.displayChatRoom) {
			setMessages(state => [...state, { message: data.messageInput }])
		}
	}

	const broadcast = () => {
		socket.emit('socket room message', {
			messageInput,
			name: firstname + ' ' + lastname,
			company_id,
			room: props.displayChatRoom,
			team_member_id: props.team_member_id
		})

		Axios.post('/messages', {
			messageInput, 
			google_review: false,
			team_member_id: props.team_member_id,
			room: props.displayChatRoom
		}).catch(console.log)

		setMessageInput('')
	}

	// const leave = () => {
	// 	socket.emit('leave socket room', props.company_id)
	// }

	return (
		<div className="chatWindow_div">

			<div className="message-container">
				{messages.map((message) => {
					return (
						<Messages
							key={message.chat_message_id}
							message={message}
							username={`${firstname} ${lastname}`}
						/>
					)
				})}
				<div ref={messagesEndRef} />
			</div>

			<div className="chat-form">
				<input
					type='text'
					value={messageInput}
					placeholder='Bro message here'
					onChange={(e) => setMessageInput(e.target.value)}
					className="text-area"
				/>
				<button onClick={broadcast}>Send Broadcast</button>
			</div>

		</div>
	)
}

const mapStateToProps = (reduxState) => {
	return reduxState
}

export default connect(mapStateToProps)(ChatWindow)
