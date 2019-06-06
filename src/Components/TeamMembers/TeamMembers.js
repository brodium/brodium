import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import christianLogic from "./../../christianLogic/christianLogic"
import Employee from "./Employee"

import axios from "axios"

const TeamMembers = (props) => {

  // -- STATE -- //
  const [teamMembers, setTeamMembers] = useState([])

  const [addNewMember, setAddNewMember] = useState(false)

  const [form, setValues] = useState({
    newFirstname: "",
    newLastname: "",
    newEmail: "",
    newIsadmin: false,
    newImg: "https://www.aber.ac.uk/staff-profile-assets/img/noimg.png"
  })

  // -- LIFECYCLE EVENTS -- //

  // useEffect(() => {
  //   if (!props.isadmin) {
  //     props.history.push("/")
  //   }
  // }, [])

  const getTeamMembers = async () => {
    // const { company_id } = props
    const company_id = 2

    await axios.get(`/team-members/${company_id}`)
      .then(res => {
        console.log("TEAM MEMBERS FROM DB", res.data)
        if (res.data.length !== teamMembers.length) {
          setTeamMembers(res.data)
          return teamMembers
        }
      }).catch(console.log)
  }
  useEffect(() => { getTeamMembers() }, [teamMembers])

  useEffect(() => { getTeamMembers() }, [])

  // -- METHODS -- //

  // Add Team Member
  const handleAddNewMember = () => { setAddNewMember(christianLogic.reverseValue(addNewMember)) }

  const handleCancelAddNewMember = event => {
    event.preventDefault()
    setAddNewMember(christianLogic.reverseValue(addNewMember))
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

  const handleAddNewUserFormSubmit = async (event) => {
    event.preventDefault()
    const { newFirstname: firstname, newLastname: lastname, newEmail: email, newIsadmin: isadmin, newImg: img } = form
    // const { company_id } = props
    const company_id = 2


    await axios.post("/team-member", { firstname, lastname, email, isadmin, company_id, img })
      .then(results => {
        const { team_member_id, firstname, email } = results.data[0]
        axios.post("/email-team-member", { team_member_id, firstname, email })
      })
      .then(getTeamMembers)
      .then(() => { setValues({ ...form, newFirstname: "", newLastname: "", newEmail: "", newIsadmin: false }) })
      .then(() => { setAddNewMember(!addNewMember) })
      .catch(console.log)
  }
  // ----- -----  

  // -- JSX -- //
  const teamMember = teamMembers && teamMembers.map((member) => {
    return <Employee member={member} getTeamMembers={getTeamMembers} key={member.team_member_id} teamMembers={teamMembers} setTeamMembers={setTeamMembers} />
  })

  return (
    <div className="team-members" >
      <h1>Team Members</h1>
      <div className="team-members-hero">
        {teamMember}
      </div>

      <div className="add-team-member">
        {
          !addNewMember ?
            <div>
              <button className="add-new-team-member-btn" onClick={handleAddNewMember}>Add New Team Member</button>
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
                <div className="add-new-team-member-btns">
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


// function mapStateToProps(state) {
//   return state
// }

// export default connect(mapStateToProps)(withRouter(TeamMembers))