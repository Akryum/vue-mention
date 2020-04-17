describe('limit', () => {
  it('displays the first 10 items', () => {
    cy.visit('/limit')
    cy.get('.input').type('@')
    cy.get('.mention-item').should('have.length', 10)
    for (let i = 0; i < 10; i++) {
      cy.get('.popover').should('contain', `item-${String(i).padStart(3, '0')}`)
    }
    // Loops
    cy.get('.input').type('{uparrow}{enter}')
    cy.get('.preview').should('contain', 'item-009')
  })

  it('searches and displays the first 10 matched items', () => {
    cy.visit('/limit')
    cy.get('.input').type('@1')
    cy.get('.mention-item').should('have.length', 10)
    cy.get('.popover').should('contain', 'item-001')
    for (let i = 0; i < 9; i++) {
      cy.get('.popover').should('contain', `item-${String(10 + i).padStart(3, '0')}`)
    }
    // Loops
    cy.get('.input').type('{uparrow}{enter}')
    cy.get('.preview').should('contain', 'item-018')
  })
})
