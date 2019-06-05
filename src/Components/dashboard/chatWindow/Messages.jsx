import React, { useState, useEffect } from 'react'

const Messages = (props) => {



  return (
    <>

      <div>
        {props.username}
        {props.message.messageInput}

      </div>

    </>
  )

}

export default Messages