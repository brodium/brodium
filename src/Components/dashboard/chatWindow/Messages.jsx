import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import Axios from 'axios';

const Messages = (props) => {

  const [teamMember, setTeamMember] = useState({})

  useEffect(() => {

    if (props.message.team_member_id) {
      Axios.get(`/team-member/${props.message.team_member_id}`)
        .then(res => setTeamMember(res.data))
        .catch(console.log)
    }
  }, [])

  return (
    <>
      <div className={
        props.team_member_id === teamMember.team_member_id ? "my-message" : "message"
      }>
        {props.team_member_id && <div className="message-username">{teamMember.firstname + ' ' + teamMember.lastname}</div>}
        {props.message.name && <div className="message-review">{props.message.name}</div>}
        {props.message.rating && <div>{props.message.rating} Out of 5 Stars </div>}
        <div className="message-message">{props.message.message}</div>
      </div>
    </>
  )
}

const mapStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapStateToProps)(Messages)