module.exports = {
  getMembersByCompany: (req, res) => {
    const { co_id } = req.params
    const db = req.app.get("db")
    db.getTeamMembers({ co_id })
      .then(results => {
        res.status(200).send(results)
      })
  },

  deleteMember: (req, res) => {
    const { team_member_id: id } = req.params
    const team_member_id = +id
    const db = req.app.get("db")
    db.deleteTeamMember({ team_member_id })
      .then(res.sendStatus(200))
      .catch((err) => { console.log(`Delete Member Error: ${err}`) })
  },

  addMember: async (req, res) => {
    const { firstname, lastname, email, isadmin, company_id, img } = req.body
    const db = req.app.get("db")

    const addTeamMember = await db.addTeamMember({ firstname, lastname, isadmin, company_id, img })
    const team_member_id = addTeamMember[0].team_member_id

    await db.addTeamMemberLogin({ email, team_member_id })
      .then(res.sendStatus(200))
      .catch((err) => { console.log(`Add Member Error: ${err}`) })
  },

  updateMember: (req, res) => {
    const { firstname, lastname, isadmin, team_member_id, email } = req.body
    const db = req.app.get("db")
    db.updateMember({ firstname, lastname, isadmin, team_member_id, email })
      .then(res.sendStatus(200))
      .catch((err) => { console.log(`Updatae Member Error: ${err}`) })
  }
}