import React, {useState} from 'react';
import axios from 'axios';

function AddChatRoom(props) {
    console.log(props)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const titleInput = (val) => {
        setTitle(val)
        console.log(title)
    }

    const descriptionInput = (val) => {
        setDescription(val)
        console.log(description)
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

    return(
        <div>
             AddChatRoom 
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
            <button onClick={() => addNewRoomToList()}> add new chat room </button>
        </div>
    )
}

export default AddChatRoom