module.exports = {
	getAllRoomsByCompany: (req, res) => {
        const db = req.app.get('db')
        const {co_id} = req.params

        // db.getAllCompanyRooms({co_id})
    }
}