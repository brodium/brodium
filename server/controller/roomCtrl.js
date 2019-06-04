module.exports = {
	getAllRoomsByCompany: (req, res) => {
        const db = req.app.get('db')
        const {co_id} = req.params

        db.getAllCompanyRooms({co_id}).then( response => {
            res.status(200).send(response)
        })
    },

    addNewRoom: (req, res) => {
        const db = req.app.get('db')
        const { title, description, companyId } = req.body
        console.log(title, description, companyId)

        db.addCompanyChatRoom({title, description, companyId}).then( response => {
            res.status(200).send(response)
        })
    },

    updateRoom: (req, res) => {
        const db = req.app.get('db')
        const { room_id } = req.params
        const { title, description } = req.body

        db.updateChatRoom({room_id, title, description}).then( response => {
            res.status(200).send(response)
        }).catch( err => console.log('updating room chat didnt work', err))
    },

    deleteRoom: (req, res) => {
        const db = req.app.get('db')
        const { room_id } = req.params

        db.deleteChatRoom({room_id}).then( response => {
            res.status(200).send(response)
        })
        .catch(err => console.log('delete button didnt work', err))
    }
}