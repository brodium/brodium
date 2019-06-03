import React, { useState, useEffect } from "react"
// import connect from "react-redux"
import Employee from "./Employee"

import axios from "axios"

// ****** Do I need to conditionally render this whole page based on whether or not the user is an Admin? ****** //
// ****** I have static data for company_id below to make it work, once things get up and running comment that code out and un-commment the code that allows for dynamic rendering ****** //

const TeamMembers = () => {

  // -- STATE -- //
  const [teamMembers, setTeamMembers] = useState([])

  const [addNewMember, setAddNewMember] = useState(false)

  const [form, setValues] = useState({
    newFirstname: "",
    newLastname: "",
    newEmail: "",
    newIsadmin: false,
    newImg: "default link" // "https://sunrisepublish.com/wp-content/uploads/2016/03/placeholder-profile-male.jpg"
  })

  // -- LIFECYCLE EVENTS -- //
  const getTeamMembers = async () => {
    // const { companyId } = this.props
    const companyId = 2
    const response = await axios.get(`/team-members/${companyId}`)
    if (response.data.length !== teamMembers.length) {
      setTeamMembers(response.data)
    }
  }
  useEffect(() => { getTeamMembers(teamMembers) }, [teamMembers])


  // -- METHODS -- //

  // Add Team Member
  const handleAddNewMember = () => { setAddNewMember(!addNewMember) }

  const handleCancelAddNewMember = event => {
    event.preventDefault()
    setAddNewMember(!addNewMember)
  }

  const updateField = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleNewTeamMemberCheckIsAdmin = () => {
    const checkIsAdmin = document.getElementById("newTeamMemberCheckIsAdmin")
    checkIsAdmin.value = checkIsAdmin.checked

    const value = () => {
      if (checkIsAdmin.value === "true") {
        return true
      } else {
        return false
      }
    }

    setValues({
      ...form, newIsadmin: value()
    })
  }

  const handleAddNewUserFormSubmit = event => {
    event.preventDefault()
    const { newFirstname: firstname, newLastname: lastname, newEmail: email, newIsadmin: isadmin, newImg: img } = form
    // const { companyId: company_id } = this.props
    const company_id = 2

    axios.post("/team-member", { firstname, lastname, email, isadmin, company_id, img })
      .then(setValues({ ...form, newFirstname: "", newLastname: "", newEmail: "", newIsadmin: false }))
      .then(setAddNewMember(!addNewMember))
  }
  // ----- -----  

  // -- JSX -- //
  const teamMember = teamMembers.map((member) => {
    return <Employee member={member} key={member.team_member_id} />
  })

  return (
    <div className="team-members">
      <div>
        {teamMember}
      </div>

      <div className="add-team-member" style={{ "border": "1px solid red" }}>
        {
          !addNewMember ?
            <div>
              <button onClick={handleAddNewMember}>Add New Team Member</button>
            </div> :
            <div>
              <form className="add-new-team-member" onSubmit={handleAddNewUserFormSubmit}>
                <label>
                  First Name:
                  <input
                    value={form.newFirstname}
                    type="text"
                    name="newFirstname"
                    onChange={updateField}
                  />
                </label>
                <label>
                  Last Name:
                  <input
                    value={form.newLastname}
                    type="text"
                    name="newLastname"
                    onChange={updateField}
                  />
                </label>
                <label>
                  Email:
                  <input
                    value={form.newEmail}
                    type="text"
                    name="newEmail"
                    onChange={updateField}
                  />
                </label>
                <label htmlFor="newIsadmin">
                  Admin
                <input
                    value={true}
                    id="newTeamMemberCheckIsAdmin"
                    type="checkbox"
                    name="isadmin"
                    onClick={handleNewTeamMemberCheckIsAdmin}
                  />
                </label>
                <div>
                  <button>Submit</button>
                  <button onClick={handleCancelAddNewMember}>Cancel</button>
                </div>
              </form>
            </div>
        }
      </div>
    </div>
  )
}


export default TeamMembers


// function mapSateToProps(state) {
//   return state
// }

// export default connect(mapStateToProps)(TeamMembers)

