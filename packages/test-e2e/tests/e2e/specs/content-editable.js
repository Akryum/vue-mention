describe('contenteditable support', () => {
  it('shows suggestions', () => {
    cy.visit('/content-editable')
    cy.get('.input').type('abc')
    cy.get('.popover').should('not.exist')
    cy.get('.input').type(' @')
    cy.get('.popover').should('be.visible')
      .should('contain', 'akryum')
      .should('contain', 'posva')
      .should('contain', 'atinux')
  })

  it('hides menu on space character', () => {
    cy.visit('/content-editable')
    cy.get('.input').type(' @')
    cy.get('.popover').should('be.visible')
    cy.get('.input').type(' ')
    cy.get('.popover').should('not.be.visible')
  })

  it('inserts suggestion on enter', () => {
    cy.visit('/content-editable')
    cy.get('.input').type(' @')
    cy.get('.popover').should('be.visible')
    cy.get('.input').type('{enter}')
    cy.get('.preview').should('contain', '@akryum')
  })

  it('searches through suggestions', () => {
    cy.visit('/content-editable')
    cy.get('.input').type(' @pos')
    cy.get('.popover').should('be.visible')
    cy.get('.mention-item').should('have.length', 1)
      .should('contain', 'posva')
    cy.get('.input').type('{enter}')
    cy.get('.preview').should('contain', '@posva')
  })

  it('does not insert a space after mention', () => {
    cy.visit('/content-editable')
    cy.get('.input').type(' @{enter}abc')
    cy.get('.preview').should('contain', '@akryumabc')
  })
})
