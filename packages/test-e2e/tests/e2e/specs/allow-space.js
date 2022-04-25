describe('with allow-space prop', () => {
  it('shows suggestions after typing mention containing space', () => {
    cy.visit('/allow-space')
    cy.get('.input').type('abc @space ')
    cy.get('.v-popper__popper').should('be.visible')
      .should('contain', 'space invader')
  })
})
