const initialState = {
	team_member_id: null,
	firstname: null,
	lastname: '',
	email: '',
	isadmin: false,
	company_name: '',
	company_id: 0,
	img: null
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
	const { type, payload } = action
	switch (type) {
		case SET_USER:
			return { ...state, ...payload }
		case SET_COMPANY:
			return { ...state, ...payload }
		case CLEAR_USER:
			return {
				team_member_id: null,
				firstname: '',
				lastname: '',
				email: '',
				isadmin: false,
				company_name: '',
				company_id: null,
				img: ''
			}
		default:
			return state
	}
}