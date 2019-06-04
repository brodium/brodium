import Axios from 'axios'
import React, { useState, useEffect, useRef } from 'react';
import {connect} from 'react-redux';
import { v4 as randomString } from 'uuid';

import {setUser} from '../../mightyDucks/authReducer'

function Profile(props) {
  const imgInput = useRef(null)
  const [loading, setLoading] = useState(false)

  const {img: profilePic, firstname, lastname, email, company_name, isadmin, team_member_id} = props.state

  const getSig = (file) => {
    setLoading(true)
		const filename = `${randomString()}-${file.name.replace(/\s/g, '-')}`

		Axios.get(`/api/sig`, {
			params: {
				filename,
				filetype: file.type
			}
		}).then(res => {
			const { signedRequest, url } = res.data
			uploadFile(file, signedRequest, url)
		})
	}

	const uploadFile = (file, signedRequest, url) => {
		const options = {
			headers: {
				'Content-Type': file.type,
			},
		}

    Axios.put(signedRequest, file, options).then(() => {
      Axios.put(`/team-member`, {
        team_member_id,
        email,
        img: url,
        firstname,
        lastname,
        isadmin
      }).then(() => {
        props.setUser({img: url})
        setLoading(false)
      })
    })
  }

  return (
    <div>
      {
        loading ? <h4>...loading</h4>
        : <div>
          {profilePic && <img style={{height: '100px', width: '100px', borderRadius: '50px'}} src={profilePic} alt="profile"/>}

          {!profilePic && <img style={{height: '100px', width: '100px', borderRadius: '50px'}} src="https://www.aber.ac.uk/staff-profile-assets/img/noimg.png" alt="profile"/>}

          <input 
            accept="image/*" 
            style={{display: 'none'}} 
            type="file"
            ref={imgInput}
            onChange={() => getSig(imgInput.current.files[0])}
          />
          {!profilePic && <button onClick={() => imgInput.current.click()}>Add Profile Picture</button>}
        </div>
      }
      <h3>{`${firstname} ${lastname}`}</h3>
      <p>{company_name}</p>
      <p>{email}</p>
    </div>
  ) 
}
const mapStateToProps = state => {
  return {state}
}

export default connect(mapStateToProps, {setUser})(Profile)