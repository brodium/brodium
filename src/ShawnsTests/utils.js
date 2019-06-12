import Axios from 'axios'

export const findCompany = (company, city, state) => {
	return Axios.get(`/places/search/${company} ${city} ${state}`)
		.then(res => res.data.results).catch(() => 'Unable to find company')
}

export const getTeamMember = (team_member_id) => {
	return Axios.get(`/team-member/${team_member_id}`)
	.then(res => res.data)
	.catch(() => 'unable to get team-member')
}


