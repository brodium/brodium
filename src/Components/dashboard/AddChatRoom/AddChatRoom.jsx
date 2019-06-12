import React, {useState} from 'react';
import axios from 'axios';


function AddChatRoom(props) {
    // console.log(props)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const titleInput = (val) => {
        setTitle(val)
        // console.log(title)
    }

    const descriptionInput = (val) => {
        setDescription(val)
        // console.log(description)
    }

    const addNewRoomToList = () => {
        const newRoomObj = {
            title,
            description,
            companyId: props.companyId
        }
        axios.post('/rooms', newRoomObj).then( res => {
            props.renderEverything()
        })
        .catch(err => console.log('doesnt work dumby', err))
    }

    const cancelNewRoomToList = () => {
        props.setShowAddRoom(false)
    }

    return(
        <div className='background_addRoom_div'>
            <div className="whiteBackground_div">
                <div className="wrappedInfo_addRoom_div">
                    <h2> Add New Chat Room </h2> 
                    <div className="input_addRoom_div">
                        <input 
                            placeholder="title"
                            onChange={(e) => titleInput(e.target.value)}
                            type="text"
                            />
                        <input 
                            placeholder="description"
                            onChange={(e) => descriptionInput(e.target.value)}
                            type="text"
                            />
                    </div>
                    <div className="btn_addRoom_div">
                        <button className="addRoom_btn" onClick={() => addNewRoomToList()}> add </button>
                        <button className="addRoom_btn" onClick={() => cancelNewRoomToList()} > Cancel </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddChatRoom