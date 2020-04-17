describe('search event', () => {
  it('emits search event', () => {
    cy.visit('/search-event')
    cy.get('.input').type('@pos')
    cy.get('.popover').should('be.visible')
    cy.get('.search').should('contain', 'pos')
  })
})
