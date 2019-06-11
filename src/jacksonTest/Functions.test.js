const { handleAddingChatRoom, handleEditView, getChatrooms } = require('./../jacksonLogic/Functions')

// test('value of state should change with each company', () => {
//     expect(handleChatRoomClick(1)).toEqual(1)
// })

test('expect to show add room onClick', () => {
    expect(handleAddingChatRoom(true)).toBe(false)
})

test('expect to show edit view', () => {
    expect(handleEditView(true)).toBe(false)
})

test('retrieve chatRooms for dashboard', () => {
    expect(getChatrooms(1)).resolves.toBe([])
})