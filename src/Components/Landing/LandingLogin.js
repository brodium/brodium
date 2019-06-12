import React from 'react'
import ConditionalRenderComp from './ConditionalRenderComp'

const LandingLogin = (props) => {

  return (
    <>
      <div>
        <ConditionalRenderComp
          history={props.history}
        />
      </div>
    </>
  )
}

export default LandingLogin