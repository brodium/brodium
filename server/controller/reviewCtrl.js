const googleCtrl = require('./googleCtrl')
const axios = require('axios')

module.exports = {
	async checkForReviews(socket) {
		console.log("cron job")
		// const db = app.get('db')
		try {
			const companies = await axios.get('/company-ids')
			// const companies = await db.getAllCompanies()
			companies.data.forEach(company => {
				axios.get(`/google-reviews/${company.company_id}`)
					.then(res => {
						const reviewsOnGoogle = googleCtrl.getDetails(company.company_id)
						if (reviewsOnGoogle.length > res.data.length) {
							const newReviewCount = reviewsOnGoogle.length - res.data.length
							//emit to socket
							for (let i = 0; i < newReviewCount; i++) {
								const {text, author_name, author_url, language, profile_photo_url, rating, time} = reviewsOnGoogle[i]
								socket.emit('socket room message', {
									messageInput: text,
									name: author_name,
									company_id: company.company_id,
									room: company.chat_room_id
								})
								db.addReview({author_name, author_url, lang: language, profile_photo_url, rating,review: text, time_stamp: time, company_id: company.company_id})
								axios.post('/messages', {
									messageInput: text,
									google_review: true,
									room: company.chat_room_id,
									author_name
								}).catch(console.log)
							}
						}
					})
			});
		}
		catch (error) {
			console.log(error)
		}
	}
}