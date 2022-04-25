describe('with allow-space prop', () => {
  it('shows suggestions after typing mention containing space', () => {
    cy.visit('/allow-space')
    cy.get('.input').type('abc @space in')
    cy.get('.v-popper__popper').should('be.visible')
      .should('contain', 'space invader')
    cy.get('.input').type('{enter}')
    cy.get('.preview').should('contain', '@space invader')
  })

  it.only('do not show suggestions when deleting applied mention', () => {
    cy.visit('/allow-space')
    cy.get('.input').type('abc @space in')
    cy.get('.v-popper__popper').should('be.visible')
      .should('contain', 'space invader')
    cy.get('.input').type('{enter}')
    cy.get('.input')
      .type('{backspace}'.repeat(14))
    cy.get('.v-popper__popper').should('not.be.visible')
    cy.get('.preview').should('not.contain', '@space invader')
  })
})
