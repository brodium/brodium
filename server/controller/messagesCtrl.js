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
	},

	getUnreadMessages(req, res) {
		const db = req.app.get('db') 
		const { team_member_id } = req.params
		db.getUnreadMessages({team_member_id}).then( response => {
			res.status(200).send(response)
		})
	},

	addUnreadMessages (req, res) {
		const db = req.app.get('db')
		const { chat_room_id, co_id } = req.body

		db.getTeamMembers({co_id}).then( members => {
			members.forEach( member => {
				db.addUnreadMessages({chat_room_id, team_member_id: member.team_member_id})
				.catch(console.log)
			});
			res.sendStatus(200)
		})
		.catch(console.log)
	},

	removeUnreadMessages (req, res) {
		const db = req.app.get('db')
		const { team_member_id } = req.params

		db.removeUnreadMessages({team_member_id}).then( res => {
			res.sendStatus(200)
		})
		.catch(console.log)
	}
}