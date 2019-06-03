describe('dashboard setup', () => {
    beforeEach( () => {
        cy.visit('/')
    })
    it('render all chatRooms', () => {
        cy.get('.chat_rooms')
        .should('exist')
        .and('have.length', 2)
        
    })
})