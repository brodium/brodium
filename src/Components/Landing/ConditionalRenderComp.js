import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm'


const ConditionalRenderComp = (props) => {
  // const [signin, setSignin] = useState(0)
  // const [register, setRegister] = useState(1)

  const signin = () => {
    props.history.push(`/login`)
  }
  const register = () => {
    props.history.push(`/register`)
  }


  return (
    <>
      <div>
        <button onClick={signin}>Sign-in</button>
      </div>
      <div>
        <button onClick={register}>Register</button>
      </div>
    </>
  )

}

export default ConditionalRenderComp