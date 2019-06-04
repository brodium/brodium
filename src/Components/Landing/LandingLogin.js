// import axios from 'axios'
import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm';
import ConditionalRenderComp from './ConditionalRenderComp'

const LandingLogin = (props) => {

  return (
    <>
      <div>
        {/* <LoginForm /> */}
        {/* <RegisterForm /> */}
        <ConditionalRenderComp
          history={props.history}
        />
      </div>
    </>
  )
}

export default LandingLogin