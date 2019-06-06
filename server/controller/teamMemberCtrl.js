const bcrypt = require('bcryptjs')

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
    const { firstname, lastname, isadmin, team_member_id, email, img } = req.body
    const db = req.app.get("db")
    db.updateMember({ firstname, lastname, isadmin, team_member_id, email, img })
      .then(() => {
        req.session.user.img = img
        res.sendStatus(200)
      })
      .catch((err) => { console.log(`Updatae Member Error: ${err}`) })
  },
  onBoardingTeamMember: (req, res) => {
    const { team_member_id } = req.params
    const db = req.app.get('db')
    db.onBoardingTeamMember({ team_member_id })
      .then(user => {
        // console.log(user[0], '111')
        res.send(user[0])
      })
      .catch((error) => { console.log(`Error with OnBoarding: ${error}`) })
  },
  onBoardingUpdatePassword: (req, res) => {
    const { team_member_id } = req.params
    const { oldPassword, password } = req.body
    // console.log(oldPassword, password)
    const db = req.app.get('db')

    // db.onBoardingTeamMember({})

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)


    db.onBoardingUpdatePassword({ team_member_id, hash })
      .then(resp => {
        res.status(200).send(resp)
      }).catch((error) => { console.log(`error at updatePassword ${error}`) })


    // get team_member id so that I can get the corect user_login
    // get old password off of user_login
    // compare old password from sql to the old password from front end
    // if not same send stattus 401 if not the same
    // update new password with old password
    // if everything checks out send new body back

  }


}