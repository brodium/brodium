import React from 'react';


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
    <div className="conditional-render-comp-hero">
      <div className="defining-message">
        <p>make brodium</p>
        <p>your unfair advantage</p>
      </div>
      <div className="login-reg-btns">
        <div>
          <button className="select-login-btn" onClick={signin}>Log In</button>
        </div>
        <hr />
        <div>
          <button className="select-register-btn" onClick={register}>Register</button>
        </div>
      </div>
    </div>
  )

}

export default ConditionalRenderComp