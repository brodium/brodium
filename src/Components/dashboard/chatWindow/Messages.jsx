import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import {getTeamMember} from '../../../ShawnsTests/utils';

const Messages = (props) => {

  const [teamMember, setTeamMember] = useState({});

  useEffect(() => {

    if (props.message.team_member_id) {
      getMemberInfo(props.message.team_member_id)
    }
  }, []);

  const getMemberInfo = async team_member_id => {
    const result = await getTeamMember(team_member_id)
    setTeamMember(result)
  }

  return (
    <>
      {
        teamMember.team_member_id &&
        <div className={
          props.team_member_id === teamMember.team_member_id ? "my-message" : "message"
        }>
          <div className="message-username">{teamMember.firstname + ' ' + teamMember.lastname}</div>
          <div className="message-message">{props.message.message}</div>
        </div>
      }

      {
        props.message.author_name &&
        <div className='review'>
          {props.message.author_name && <div className="review-author">{props.message.author_name}</div>}
          {props.message.rating && <div className="review-rating">{props.message.rating} Out of 5 Stars </div>}
          <div className="review-message">{props.message.message}</div>
        </div>

      }
    </>
  )
}

const mapStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapStateToProps)(Messages)