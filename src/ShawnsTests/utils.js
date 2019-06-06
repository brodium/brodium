import Axios from 'axios'

export const findCompany = (company, city, state) => {
	return Axios.get(`/places/search/${company} ${city} ${state}`)
		.then(res => res.data.results).catch(console.log)
}