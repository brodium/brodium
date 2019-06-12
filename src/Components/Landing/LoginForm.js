import React, { useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser, setCompany } from '../../mightyDucks/authReducer'

const LoginForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = async (e) => {
    console.log('does this work')
    e.preventDefault();

    try {
      const res = await axios.post(`/auth/login`,
        {
          email,
          password
        })

      const { team_member_id, firstname, lastname, isadmin, company, company_id, img } = res.data
      console.log(company_id)

      props.setUser({ team_member_id, firstname, lastname, email, isadmin, img })
      props.setCompany({ company, company_id })

      // setEmail('')
      // setPassword('')

      props.history.push(`/`)
    }
    catch (err) {
      console.log(err)
    }

  }

  const handleInputChange1 = (e) => {
    e.persist();
    setEmail(e.target.value)
  }

  const handleInputChange2 = (e) => {
    e.persist();
    setPassword(e.target.value)
  }

  return (
    <div className="login-hero">
      {/* <h2>Login</h2> */}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder='Email'
            type='email'
            onChange={handleInputChange1}
            value={email}
            className="login-email"
          />
        </div>
        <div>
          <input
            placeholder='Password'
            type='password'
            onChange={handleInputChange2}
            value={password}
            className="login-password"
          />
        </div>
        <div className="login-btn">
          <button
            onClick={handleSubmit}
            type='submit'
          >Login</button>
        </div>
      </form>

    </div>
  )
}
const mapDispatchToProps = {
  setCompany,
  setUser
}

export default connect(null, mapDispatchToProps)(withRouter(LoginForm))