require("dotenv").config()
const { EMAIL_PASSWORD, EMAIL } = process.env
const nodemailer = require("nodemailer")

module.exports = {
  sendLoginRequest: (req, res) => {
    const { team_member_id, firstname, email } = req.body

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
      }
    })

    let mailOptions = {
      from: '"Charley Andrews" <hiutclone@gmail.com>',
      to: email,
      subject: 'You Have Been Invited to Join Brodium',

      html: `<p style="font-family: 'Tinos', serif; font-size: 16px;">Hi ${firstname},</p>
      <p style="font-family: 'Tinos', serif; font-size: 16px;">You have been invited to join your team on the Brodium platform.</p>
      <p style="color: #C61B21; font-weight: 700; font-family: 'Tinos', serif; font-size: 16px; font-style: italic;">Please click on the link below to continue. If you are not redirected, please copy and paste the link into your browser's address bar.</p>
      <br />

      <a href="http://localhost:3000/#/onboarding/${team_member_id}">http://localhost:3000/#/onboarding/${team_member_id}</a>

      <p>Thanks!</p>`,

      text: `Hi ${firstname}, You have been invited to join your team on the Brodium platform. Please copy and paste the following URL into your browser's address bar to complete your registration: http://localhost:3000/#/onboarding/${team_member_id}`
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err)
      } else {
        console.log("The info was sent")
        console.log("THIS IS THE INFO", info)
      }
    })


    res.sendStatus(200)

  }
}