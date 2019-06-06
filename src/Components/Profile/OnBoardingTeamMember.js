import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import { withRouter } from 'react-router-dom'


function OnBoardingTeamMember(props) {

  console.log('reduxState@ boarding', props.reduxState)
  // const { email, hash, team_member_id, firstname, lastname, isadmin, img: profilePic
  // } = props.reduxState

  const [teamMember, setTeamMember] = useState({})

  const [password, setPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')

  const { firstname, lastname, email, team_member_id } = teamMember

  useEffect(() => {
    const { team_member_id } = props.match.params
    axios.get(`/onboarding/${team_member_id}`).then(res => {
      setTeamMember(res.data)
    }).catch(console.log)
  }, [])


  const onBoardUpdatePassword = async (e) => {
    e.preventDefault()
    // console.log(oldPassword, password, 'upPass@onBoardTMembers')
    await axios.put(`/onboarding/${team_member_id}`, { oldPassword, password }).then(() => {

    })

    props.history.push('/landing')
  }

  const UpdatePasswordInput = (e) => {
    setPassword(
      e.target.value
    )
  }
  const UpdatePasswordInput2 = (e) => {
    setOldPassword(
      e.target.value
    )
  }



  return (
    <>
      <h3>On-Boarding Page</h3>
      <div>
        {/* <div>{company_name}</div> */}
        <div> {`${firstname} ${lastname}`}</div>
        <div>{`${email}`}</div>

        <form>
          {/* <div>

            <input
              name='oldPassword'
              type='text'
              onChange={UpdatePasswordInput2}
            />
          </div> */}
          <div>
            <input
              name='password'
              type='text'
              onChange={UpdatePasswordInput}

            />
          </div>
          <button onClick={onBoardUpdatePassword}>change password</button>


        </form>



      </div>



    </>
  )
}


const mapStateToProps = reduxState => {
  return { reduxState }
}

export default connect(mapStateToProps)(withRouter(OnBoardingTeamMember))