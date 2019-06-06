module.exports = {
	addMessage(req, res) {
		const db = req.app.get('db')
		const {messageInput: message, google_review, team_member_id, room: chat_room_id} = req.body

		const time_stamp = new Date()
		db.addMessage({message, google_review, time_stamp, team_member_id, chat_room_id})
		.then(() => res.sendStatus(200))
		.catch(console.log)
	},

	getMessagesByRoomId(req, res) {
		const db = req.app.get('db')
		const {room} = req.params
		db.getMessagesByRoomId({room}).then(messages => {
			res.status(200).send(messages)
		}).catch(console.log)
	}
}