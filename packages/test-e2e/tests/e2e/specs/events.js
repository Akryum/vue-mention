describe('events', () => {
  it('emits search event', () => {
    cy.visit('/search-event')
    cy.get('.input').type('@pos')
    cy.get('.v-popper__popper').should('be.visible')
    cy.get('.search').should('contain', 'pos')
  })

  it('emits open and close events', () => {
    cy.visit('/search-event')
    cy.get('.input').type('@pos')
    cy.get('.v-popper__popper').should('be.visible')
    cy.get('.open').should('contain', '@')
    cy.get('.close').should('not.contain', '@')
    cy.get('.input').clear()
    cy.get('.v-popper__popper').should('not.be.visible')
    cy.get('.close').should('contain', '@')
  })

  it('emits apply event', () => {
    cy.visit('/search-event')
    cy.get('.input').type('@pos')
    cy.get('.v-popper__popper').should('be.visible')
    cy.get('.apply').should('not.contain', '"item":')
    cy.get('.input').type('{downArrow}{enter}')
    cy.get('.apply').should('contain', 'value: posva')
      .should('contain', 'key: @')
      .should('contain', 'replacedWith: @posva')
  })
})
