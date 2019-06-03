const initialState = {
	team_member_id: null,
	firstname: '',
	lastname: '',
	email: '',
	isadmin: false,
	company: '',
	company_id: null,
	img: ''
}

const SET_USER = 'SET_USER';
const SET_COMPANY = 'SET_COMPANY';
const CLEAR_USER = 'CLEAR_USER';

export function setUser(userInfo) {
	
	return {
		type: SET_USER,
		payload: userInfo
	}
}
export function setCompany(company) {
	
	return {
		type: SET_COMPANY,
		payload: company
	}
}
export function clearUser() {
	return {
		type: CLEAR_USER
	}
}

export default (state = initialState, action) => {
	const {type, payload} = action
	switch(type) {
		case SET_USER:
			return {...state, ...payload}
		case SET_COMPANY:
			return {...state, company: payload.company}
		case CLEAR_USER:
			return {
				memberId: null,
				firstname: '',
				lastname: '',
				email: '',
				isAdmin: false,
				company: '',
				companyId: null,
				img: ''
			}
		default:
			return state
	}
}