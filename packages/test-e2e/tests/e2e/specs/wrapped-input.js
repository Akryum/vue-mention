describe('wrapped input support', () => {
  it('finds the textarea', () => {
    cy.visit('/wrapped-input')
    cy.get('.input').type('abc')
    cy.get('.v-popper__popper').should('not.exist')
    cy.get('.input').type(' @')
    cy.get('.v-popper__popper').should('be.visible')
      .should('contain', 'akryum')
      .should('contain', 'posva')
      .should('contain', 'atinux')
  })

  it('finds the input', () => {
    cy.visit('/wrapped-input')
    cy.get('.toggle').click()
    cy.get('.input').type('abc')
    cy.get('.v-popper__popper').should('not.exist')
    cy.get('.input').type(' @')
    cy.get('.v-popper__popper').should('be.visible')
      .should('contain', 'akryum')
      .should('contain', 'posva')
      .should('contain', 'atinux')
  })
})
