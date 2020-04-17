describe('default item slot', () => {
  it('display custom item content', () => {
    cy.visit('/item-slot')
    cy.get('.input').type('@')
    cy.get('.mention-item')
      .should('contain', 'Guillaume')
      .should('contain', 'Eduardo')
      .should('contain', 'Sébastien')
  })
})
