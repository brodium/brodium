import axios from "axios"

export const reverseValue = (value) => {
  return !value
}

export const redirectIfFalse = (val) => {
  if (!val) {
    return false
  }
}

export const checkNewMemberIsAdmin = (val) => {
  if (val === "true") {
    return true
  } else {
    return false
  }
}

export const getNumberOfTeamMembers = async (company_id) => {
  const response = await axios.get(`/team-members/${company_id}`)
  return response.data
}

export const emailNewTeamMember = async (team_member_id, firstname, email) => {
  const response = await axios.post("/email-team-member", { team_member_id, firstname, email })
  return response.data
}