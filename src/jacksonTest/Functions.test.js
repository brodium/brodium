const { handleAddingChatRoom, handleEditView, getChatrooms, getUnreadMessages, handleInputTitle } = require('./../jacksonLogic/Functions')

test('expect to show add room onClick', () => {
    expect(handleAddingChatRoom(true)).toBe(false)
})

test('expect to show edit view', () => {
    expect(handleEditView(true)).toBe(false)
})

test('retrieve chatRooms for dashboard', () => {
    expect(getChatrooms(1)).resolves.toBe([])
})

test('retrieve unreadMessages for state', () => {
    expect(getUnreadMessages(23)).resolves.toBe([])
})

test('enter text into title input box', () => {
    expect(handleInputTitle('Micheal Scott')).toBe("")
})