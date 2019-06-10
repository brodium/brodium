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

	async getDetails(google_place_id) {
		let details
		try {
			details = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.REACT_APP_GOOGLE_KEY}&placeid=${google_place_id}`)
			console.log(details.data)
		} catch (error) {
			console.log(error)
		}
		
		return details.data.result.reviews
	}

}
