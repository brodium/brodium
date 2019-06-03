import React, { useState, useRef } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'


const LoginForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = async (e) => {
    console.log('does this work')
    e.preventDefault();

    const res = await axios.post(`/auth/login`,
      {
        email,
        password
      })
    console.log(`handleSub@LoginForm`, res.data)
    setEmail(email)
    setPassword(password)

    props.history.push(`/`)

  }


  const handleInputChange1 = (e) => {
    console.log(`handleInput1 on LoginForm`, email)
    e.persist();

    if (e.target.name === email) {
      setEmail(e.target.value)
    }
  }

  const handleInputChange2 = (e) => {
    console.log(`handleInput2 on LoginForm`, password)
    e.persist();
    if (e.target.name === password) {
      setPassword(e.target.value)
    }

  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder='Email'
            type='email'
            onChange={handleInputChange1}
            value={email.setEmail}
          />
        </div>
        <div>
          <input
            placeholder='Password'
            type='password'
            onChange={handleInputChange2}
            value={password.setPassword}
          />
        </div>
        <button
          onClick={handleSubmit}
          type='submit'
        >Login</button>
      </form>

    </>
  )
}


export default withRouter(LoginForm)