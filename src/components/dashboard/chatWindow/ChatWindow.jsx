import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client'
import Axios from 'axios';
import { connect } from 'react-redux'
import Messages from './Messages';


function ChatWindow(props) {
	const [room, setRoom] = useState(props.displayChatRoom)
	const [messages, setMessages] = useState([])
	const [messageInput, setMessageInput] = useState('')
	const [socket, setSocket] = useState(null)

	const { firstname, lastname, company_id, img } = props

	const messagesEndRef = useRef(null)

	const scrollToBottom = () => { messagesEndRef.current.scrollIntoView({ behavior: "smooth" }) }

	useEffect(() => { scrollToBottom() }, [messages])
	// useEffect(() => {
	// 	Axios.get(`/messages/${room}`).then(res => {
	// 		setMessages(res.data)
	// 	})
	// }, [])

	useEffect(() => {
		const socket = io.connect(':4444')
		console.log(socket)
		etSocket(socket)
		ocket.emit('socket room', company_id)
		ocket.on('socket room message', messageReceiver)
		 [])
	
	const messageReceiver = data => {
		//make one chat room based off the company id not the chat room id. the company id will become the socket room for each company.
		// make logic to show the message or not based off of the company id
		// cron job? connect it to sockets? it will send it as a new message when it comes into the company channel. 
		setMessages(state => [...state, { messageInput: data.messageInput }])
	}

	const broadcast = () => {
		socket.emit('socket room message', {
			messageInput,
			name: firstname + ' ' + lastname,
			company_id,
			room
		})
				
					
						
							broadcast = () => {
							t.emit('socket room message', {
							ageInput,
						e: firstname + ' ' + lastname,
					mpany_id,
				oo
			m
			     
			setMes sageInput('')
		}
		
			const leave = () => {
				socket.emit('leave socket room', props.company_id)
				
				
				rn (
				v>
			
			div className="message-container">
			{messages.map((message) => {
						return (
							< Messages
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