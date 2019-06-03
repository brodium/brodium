import React, { useState, useEffect } from "react"
// import connect from "react-redux"

import axios from "axios"

// ****** Do I need to conditionally render this whole page based on whether or not the user is an Admin? ****** //
// ****** I don't know what I'm missing to prevent an infinite loop from happening with useEffect() ****** //
// ****** I have static data for company_id below to make it work, once things get up and running comment that code out and un-commment the code that allows for dynamic rendering ****** //
// ****** Booleans aren't holding when retrieving data from the db and when using checkboxes | figure out how to convert string to boolean ***** //

const TeamMembers = () => {

  // -- STATE -- //
  const [teamMembers, setTeamMembers] = useState([])

  const [edit, setEdit] = useState(false)

  const [editMember, setEditMember] = useState({
    firstname: "",
    lastname: "",
    email: "",
    isadmin: false
  })

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
    const companyId = 1
    const response = await axios.get(`/team-members/${companyId}`)
    setTeamMembers(response.data)
  }

  useEffect(() => { getTeamMembers() }, [])
  // useEffect(() => { getTeamMembers(teamMembers) }, [teamMembers])


  // -- METHODS -- //

  // Delete Team Member
  const deleteTeamMember = team_member_id => { axios.delete(`/team-member/${team_member_id}`) }
  // ----- -----

  // Edit Team Member
  const handleEditTeamMember = (event) => {
    setEdit(!edit)
  }

  const handleCancelEditTeamMember = (event) => {
    event.preventDefault()
    setEditMember({ ...editMember, firstname: "", lastname: "", email: "", isadmin: false })
    setEdit(!edit)
  }

  const editField = event => {
    setEditMember({
      ...editMember,
      [event.target.name]: event.target.value
    })
  }

  const handleEditTeamMemberCheckIsAdmin = () => {
    const checkIsAdmin = document.getElementById("editTeamMemberCheckIsAdmin")
    checkIsAdmin.value = checkIsAdmin.checked

    const value = () => {
      if (checkIsAdmin.value === "true") {
        return true
      } else {
        return false
      }
    }

    setEditMember({
      ...editMember,
      isadmin: value()
    })

    // setEditMember({
    //   ...editMember,
    //   isadmin: checkIsAdmin.value
    // })
  }

  const handleEditMemberFormSubmit = (event, team_member_id) => {
    event.preventDefault()

    console.log(editMember)

    const { firstname, lastname, email, isadmin } = editMember

    axios.put("/team-member", { team_member_id, firstname, lastname, email, isadmin })
      .then(setEditMember({ ...editMember, firstname: "", lastname: "", email: "", isadmin: false }))
      .then(setEdit(!edit))
  }
  // ----- -----

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

    // setValues({
    //   ...form, newIsadmin: checkIsAdmin.value
    // })
  }

  const handleAddNewUserFormSubmit = event => {
    event.preventDefault()
    const { newFirstname: firstname, newLastname: lastname, newEmail: email, newIsadmin: isadmin, newImg: img } = form
    // const { companyId: company_id } = this.props
    const company_id = 1

    axios.post("/team-member", { firstname, lastname, email, isadmin, company_id, img })
      .then(setValues({ ...form, newFirstname: "", newLastname: "", newEmail: "", newIsadmin: false }))
      .then(setAddNewMember(!addNewMember))
  }
  // ----- -----  

  console.log(editMember)

  // -- JSX -- //
  const teamMember = teamMembers.map((member) => {
    return !edit ?
      <div className="team-member" key={member.team_member_id}>
        <div>{member.firstname}</div>
        <div>{member.lastname}</div>
        <div>{member.email}</div>
        {member.isadmin ?
          <div className="tm-admin-true">Admin</div> :
          <div className="tm-admin-false">Not Admin</div>
        }
        <div className="tm-btns">
          <button className="tm-remove-btn" onClick={() => deleteTeamMember(member.team_member_id)}>Remove</button>
          <button className="tm-edit-btn" onClick={handleEditTeamMember}>Edit</button>
        </div>
      </div> :

      <div key={member.team_member_id}>
        <form className="edit-team-member" onSubmit={(event) => handleEditMemberFormSubmit(event, member.team_member_id)}>
          <label>
            First Name:
            <input
              value={editMember.firstname}
              placeholder={member.firstname}
              type="text"
              name="firstname"
              onChange={editField}
            />
          </label>
          <label>
            Last Name:
            <input
              value={editMember.lastname}
              placeholder={member.lastname}
              type="text"
              name="lastname"
              onChange={editField}
            />
          </label>
          <label>
            Email:
            <input
              value={editMember.email}
              placeholder={member.email}
              type="text"
              name="email"
              onChange={editField}
            />
          </label>
          <label htmlFor="isadmin">
            Admin
            <input
              value={true}
              id="editTeamMemberCheckIsAdmin"
              type="checkbox"
              name="isadmin"
              onClick={handleEditTeamMemberCheckIsAdmin}
            />
          </label>
          <div>
            <button>Submit</button>
            <button onClick={handleCancelEditTeamMember}>Cancel</button>
          </div>
        </form>
      </div>
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






































// ** ----- **

// Ties to chrisianLogic file

// import { addTodo } from "../../christianLogic/christianLogic"

// const EditTeamMembers = () => {


//   const [todos, setTodos] = useState(["clean room", "buy food", "walk dog"])

//   console.log(todos)

//   return (
//     <div>
//       <h1>{todos}</h1>
//       <button onClick={() => setTodos(addTodo(todos, "take out trash"))}>Name</button>
//     </div>

//   )
// }