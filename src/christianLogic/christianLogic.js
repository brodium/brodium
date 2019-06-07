import axios from "axios"

export const reverseValue = (value) => {
  return !value
}

export const getTeamMembers = (company_id) => {
  return axios.get(`/team-members/${company_id}`)
    .then(res => res.data)
    .catch(err => { console.log("error:", err) })
}