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
		if (props.displayChatRoom) {
			Axios.get(`/messages/${props.displayChatRoom}`).then(res => {
				setMessages(res.data)
			})
		}
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


	const messageReceiver = (data) => {
		// make logic to show the message or not based off of the company id
		if (data.room === props.displayChatRoom) {
			setMessages(state => [...state, {
				message: data.messageInput,
				team_member_id: data.team_member_id,
				rating: data.rating,
				name: data.name,
				chat_message_id: Date.now()
			}])
		} else {
			props.newMessageTrigger()
		}
	}

	const broadcast = () => {
		Axios.post('/unread-messages', {
			chat_room_id: props.displayChatRoom,
			co_id: props.company_id,
			team_member_id: props.team_member_id
		}).then(() => {
			socket.emit('socket room message', {
				messageInput,
				name: firstname + ' ' + lastname,
				company_id,
				room: props.displayChatRoom,
				team_member_id: props.team_member_id,
				author_name: null
			})
		})
			.catch(console.log)

		Axios.post('/messages', {
			messageInput,
			google_review: false,
			team_member_id: props.team_member_id,
			room: props.displayChatRoom
		}).catch(console.log)

		setMessageInput('')
	}

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
				<button onClick={broadcast}>Send</button>
			</div>

		</div>
	)
}

const mapStateToProps = (reduxState) => {
	return reduxState
}

export default connect(mapStateToProps)(ChatWindow)
