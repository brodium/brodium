const googleCtrl = require('./googleCtrl')
const axios = require('axios')

module.exports = {
	async checkForReviews() {
		console.log("cron job")
		//get companies
		try {
			const companies = axios.get()//get companies
			companies.forEach(company => {
				axios.get()//get reviews by company
				.then(res => {
					if (googleCtrl.getDetails(company.company_id).length > res.data.length) {
						//emit to socket
						//add new reviews to db
					}
				})
			});
		}
		catch(error) {
			console.log(error)
		}
		//loop through and compare stored reviews to reviews from google call
			//if new reviews emit and add to db
	}
}