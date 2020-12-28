describe('search event', () => {
  it('emits search event', () => {
    cy.visit('/search-event')
    cy.get('.input').type('@pos')
    cy.get('.popover').should('be.visible')
    cy.get('.search').should('contain', 'pos')
  })
})

describe('open and close events', () => {
  it('emits open and close events', () => {
    cy.visit('/search-event')
    cy.get('.input').type('@pos')
    cy.get('.popover').should('be.visible')
    cy.get('.open').should('contain', 'posva')
    cy.get('.close').should('not.contain', 'posva')
    cy.get('.input').clear()
    cy.get('.popover').should('not.be.visible')
    cy.get('.close').should('contain', '@')
  })
})
