describe('with multiple collections and @open', () => {
  it('shows user suggestions with @open', () => {
    cy.visit('/multiple-collections')
    cy.get('.input').type('@')
    cy.get('.popover').should('be.visible')
      .should('contain', 'akryum')
      .should('contain', 'posva')
      .should('contain', 'atinux')
    cy.get('.user').should('have.length', 3)
  })

  it('shows issue suggestions with @open', () => {
    cy.visit('/multiple-collections')
    cy.get('.input').type('#')
    cy.get('.popover').should('be.visible')
      .should('contain', '#123')
      .should('contain', '#42')
      .should('contain', '#77')
    cy.get('.issue').should('have.length', 3)
  })

  it('shows custom no-result content', () => {
    cy.visit('/multiple-collections')
    cy.get('.input').type('@zzz')
    cy.get('.popover').should('be.visible')
    cy.get('.custom-no-result').should('be.visible')
  })
})
