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

export const getUnreadMessages = (axios, team_member_id, setUnreadMessage) => {
    return axios.get(`/unread-messages/${team_member_id}`).then(res => {
        setUnreadMessage(res.data)
    }).catch(err => console.log('didnt get unread messages', err))
}

export const handleInputTitle = (val, setEditTitle) => {
    setEditTitle(val)
}
