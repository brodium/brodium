import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"

const Messages = (props) => {

  return (
    <>
      <div className={
        props.username === `${props.firstname} ${props.lastname}` ? "my-message" : "message"
      }>
        <div className="message-username">{props.username}</div>
        <div className="message-message">{props.message.message}</div>
      </div>
    </>
  )
}

const mapStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapStateToProps)(Messages)