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
      .then(
        res.sendStatus(200)
      )
  },

  addMember: (req, res) => {
    const { firstname, lastname, email, isadmin, company_id, img } = req.body
    const db = req.app.get("db")
    db.addTeamMember({ firstname, lastname, email, isadmin, company_id, img })
      .then(
        res.sendStatus(200)
      )
  },

  updateMember: (req, res) => {
    const { firstname, lastname, isadmin, team_member_id, email } = req.body
    const db = req.app.get("db")
    db.updateMember({ firstname, lastname, isadmin, team_member_id, email })
      .then(
        res.sendStatus(200)
      )
  }
}