import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { handleEditView, handleInputTitle } from './../../../jacksonLogic/Functions';

const notification = {
    height: '10px',
    width: '10px',
    borderRadius: '1200px',
    backgroundColor: 'red'
}

function EditChatRoom(props) {
    let [showEditField, setEditField] = useState(false)
    let [editTitle, setEditTitle] = useState(props.title)
    let [editDescription, setEditDescription] = useState(props.description)
    let [showNotification, setShowNotification] = useState(false)

    const handleCancelBtn = () => {
        setEditField(!showEditField)
    }

    const handleInputDescript = (val) => {
        setEditDescription(val)
    }

    const saveEditChanges = (id) => {
        let title = editTitle
        let description = editDescription

        let newObj = {
            title,
            description
        }

        axios.put(`/rooms/${id}`, newObj).then(res => {
            let co_id = props.company_id
            axios.get(`/rooms/${co_id}`).then(res => {
                props.setCompany(res.data)
                setEditField(!showEditField)
            }).catch(console.log)
        }).catch(console.log)
    }

    useEffect(() => {
        const showNotification = props.unreadMessage.find((el) => {
            return el.chat_room_id === props.chat_room_id
        })
        setShowNotification(showNotification)
    }, [])

    useEffect(() => {
        const showNotification = props.unreadMessage.find((el) => {
            return el.chat_room_id === props.chat_room_id
        })
        setShowNotification(showNotification)
    }, [props.newMessageTrigger, props.unreadMessage.length])


    return (

        <div 
            className={props.displayChatRoom === props.chat_room_id ? 'editChatRoom editChatRoom-click' : 'editChatRoom'}
            onClick={() => props.chatRoomClick(props.chat_room_id)}>
            <h4> {props.title} </h4>
            <label> {props.description} </label>


            {showNotification && <div style={notification}> </div>}
            <div className="edit-delete-chatroom-btns">
                <div className=' whenHoovered1'> {!showEditField ?
                    <i
                        className="far fa-edit"
                        onClick={() => handleEditView(props.chat_room_id, setEditField, showEditField)}
                    > </i> :
                    <div>
                        <input
                            onChange={(e) => handleInputTitle(e.target.value, setEditTitle)}
                            defaultValue={props.title}
                            type="text" />
                        <input
                            onChange={(e) => handleInputDescript(e.target.value)}
                            defaultValue={props.description}
                            type="text" />
                        <button
                            className='editChatRoom-btn whenHovered1'
                            onClick={() => handleCancelBtn()} >
                            Cancel
                            </button>
                        <button
                            className='editChatRoom-btn whenHovered1'
                            onClick={() => saveEditChanges(props.chat_room_id)}>
                            Save
                            </button>
                    </div>
                }

                </div>
                <i
                    className="far fa-trash-alt whenHoovered3"
                    onClick={() => props.deleteChatRoom(props.chat_room_id)} > </i>
            </div>
            <hr />
        </div>
    )
}


const mapStateToProps = (reduxState) => {
    const { company_id } = reduxState
    return {
        company_id
    }
}

export default connect(mapStateToProps)(EditChatRoom)