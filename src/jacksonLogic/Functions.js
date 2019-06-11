//    export const handleChatRoomClick = (id, setDisplayChatRoom, displayChatRoom) => {
// 		console.log(id)
// 		setDisplayChatRoom(id)
// 		console.log(displayChatRoom)
// 	}

export const handleAddingChatRoom = ( value, setShowAddRoom) => {
    return setShowAddRoom(!value)
    // console.log(showAddRoom)
}

export const handleEditView = ( val ,setEditField, showEditField ) => {
    setEditField(!showEditField)
}

export const getChatrooms = (axios, co_id, setCompany) => {
    return axios.get(`/rooms/${co_id}`).then(res => {
        setCompany(res.data)
    }).catch(console.log)
}
