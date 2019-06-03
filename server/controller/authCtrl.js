const bcrypt = require('bcryptjs');

module.exports = {
<<<<<<< HEAD
	// register(req, res) {
	// 	const db = req.app.get('db')
	// 	const {firstname, lastname, email, password, companyName, address}
=======
	async registerCompany(req, res) {
		const db = req.app.get('db')

		const { company_name, address, google_places_id } = req.body.company

		//check if company is in db
		const companyExists = await db.getCompanyByPlaceId({ google_places_id })
		if (companyExists[0]) {
			return res.status(409).send('Company is already registered. Please sign in.')
		}

		const companyRegistered = await db.registerCompany({ company_name, address, google_places_id })
		const company = companyRegistered[0]

		//add default chat room

		//add to session
		req.session.company = company

		res.status(200).send(company)
>>>>>>> master

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

	async registerUser(req, res) {
		const db = req.app.get('db')
		const { firstname, lastname, isadmin, img, email, password } = req.body.user
		const { company_id } = req.session.company

		const userExists = await db.getUserByEmail({ email })
		if (userExists[0]) {
			return res.status(409).send('You are already a user. Please sign in.')
		}

		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(password, salt)

		const memberAdded = await db.registerUser({ firstname, lastname, isadmin, img, company_id })

		const loginAdded = await db.addUserLogin({ email, hash, team_member_id: memberAdded[0].team_member_id })

		req.session.user = memberAdded[0]
		req.session.user.email = loginAdded[0].email
		res.status(200).send(req.session.user)
	},

	getSessionUser(req, res) {
		if (req.session.user) {
			return res.status(200).send(req.session)
		}
		res.send()
	}

}