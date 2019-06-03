const bcrypt = require('bcryptjs');

module.exports = {
	// register(req, res) {
	// 	const db = req.app.get('db')
	// 	const {firstname, lastname, email, password, companyName, address}

	// },
	login: async (req, res) => {
		console.log('login@authCtrl')
		const db = req.app.get(`db`)
		const { session } = req
		const { email: email } = req.body
		try {
			let emailExists = await db.UserLoginForm({ email })
			console.log('123', emailExists)
			session.email = emailExists[0]
			const authenticated = bcrypt.compareSync(req.body.password, emailExists[0].hash)
			console.log(`email in login@authCtrl`, email)
			if (authenticated) {
				res.status(200).send({ authenticated, email: email[0].login_id })
			} else {
				throw new Error(401)
			}
		} catch (error) {
			console.log(error)
			res.sendStatus(401)
		}
	},
}