module.exports = {
	addMessage(req, res) {
		const db = req.app.get('db')
		const {messageInput: message, google_review, team_member_id, room: chat_room_id, author_name, rating} = req.body

		const time_stamp = new Date()
		db.addMessage({author_name, rating, message, google_review, time_stamp, team_member_id, chat_room_id})
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
		}).catch(console.log)
	},

	addUnreadMessages (req, res) {
		const db = req.app.get('db')
		const { chat_room_id, co_id, team_member_id } = req.body
			//dont add for team_member that sent it.
			db.getTeamMembers({co_id}).then( members => {
				members.forEach( member => {
					if(team_member_id !== member.team_member_id){
						db.addUnreadMessages({chat_room_id, team_member_id: member.team_member_id})
						.catch(console.log)
					}
				});
				res.sendStatus(200)
			})
			.catch(console.log)
	},

	removeUnreadMessages (req, res) {
		const db = req.app.get('db')
		const { team_member_id, chat_room_id } = req.params
		console.log('params', team_member_id, chat_room_id)

		db.removeUnreadMessages({team_member_id, chat_room_id}).then( () => {
			res.sendStatus(200)
		})
		.catch(console.log)
	}
}