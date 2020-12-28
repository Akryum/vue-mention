describe('wrapped input support', () => {
  it('finds the textarea', () => {
    cy.visit('/wrapped-input')
    cy.get('.input').type('abc')
    cy.get('.popover').should('not.exist')
    cy.get('.input').type(' @')
    cy.get('.popover').should('be.visible')
      .should('contain', 'akryum')
      .should('contain', 'posva')
      .should('contain', 'atinux')
  })

  it('finds the input', () => {
    cy.visit('/wrapped-input')
    cy.get('.toggle').click()
    cy.get('.input').type('abc')
    cy.get('.popover').should('not.exist')
    cy.get('.input').type(' @')
    cy.get('.popover').should('be.visible')
      .should('contain', 'akryum')
      .should('contain', 'posva')
      .should('contain', 'atinux')
  })
})
