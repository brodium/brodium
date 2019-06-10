const axios = require('axios')

module.exports = {
	searchPlaces(req, res) {
		const { company } = req.params

		axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.REACT_APP_GOOGLE_KEY}&inputtype=phonenumber&input=${company}`)
			.then(place => {
				res.status(200).send(place.data)
			})
			.catch(console.log)
	},

	getGoogleReviews(req, res) {
		const db = req.app.get("db")
		const { company_id } = req.params

		db.getGoogleReviewsByCompanyId({ company_id })
			.then(results => {
				res.status(200).send(results)
			})
			.catch(console.log)

	}

}
