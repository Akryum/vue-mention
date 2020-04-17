describe('with default props', () => {
  it('shows suggestions', () => {
    cy.visit('/defaults')
    cy.get('.input').type('abc')
    cy.get('.popover').should('not.exist')
    cy.get('.input').type(' @')
    cy.get('.popover').should('be.visible')
      .should('contain', 'akryum')
      .should('contain', 'posva')
      .should('contain', 'atinux')
  })

  it('hides menu on blur', () => {
    cy.visit('/defaults')
    cy.get('.input').type('@')
    cy.get('.popover').should('be.visible')
    cy.get('.preview').click()
    cy.get('.popover').should('not.be.visible')
  })

  it('hides menu on space character', () => {
    cy.visit('/defaults')
    cy.get('.input').type('@')
    cy.get('.popover').should('be.visible')
    cy.get('.input').type(' ')
    cy.get('.popover').should('not.be.visible')
  })

  it('inserts suggestion on click', () => {
    cy.visit('/defaults')
    cy.get('.input').type('@')
    cy.get('.popover').should('be.visible')
    cy.get('.mention-item').eq(0).click()
    cy.get('.preview').should('contain', '@akryum')
  })

  it('inserts suggestion on enter', () => {
    cy.visit('/defaults')
    cy.get('.input').type('@')
    cy.get('.popover').should('be.visible')
    cy.get('.input').type('{enter}')
    cy.get('.preview').should('contain', '@akryum')
  })

  // https://github.com/cypress-io/cypress/issues/311
  // it('insert suggestion on tab', () => {
  //   cy.visit('/defaults')
  //   cy.get('.input').type('@')
  //   cy.get('.popover').should('be.visible')
  //   cy.get('.input').tab()
  //   cy.get('.preview').should('contain', '@akryum')
  // })

  it('selects another suggestion with key down', () => {
    cy.visit('/defaults')
    cy.get('.input').type('@')
    cy.get('.popover').should('be.visible')
    cy.get('.input').type('{downarrow}{downarrow}{enter}')
    cy.get('.preview').should('contain', '@atinux')
  })

  it('loops key down', () => {
    cy.visit('/defaults')
    cy.get('.input').type('@')
    cy.get('.popover').should('be.visible')
    cy.get('.input').type('{downarrow}{downarrow}{downarrow}{enter}')
    cy.get('.preview').should('contain', '@akryum')
  })

  it('loops key up', () => {
    cy.visit('/defaults')
    cy.get('.input').type('@')
    cy.get('.popover').should('be.visible')
    cy.get('.input').type('{uparrow}{enter}')
    cy.get('.preview').should('contain', '@atinux')
  })

  it('searches through suggestions', () => {
    cy.visit('/defaults')
    cy.get('.input').type('@pos')
    cy.get('.popover').should('be.visible')
    cy.get('.mention-item').should('have.length', 1)
      .should('contain', 'posva')
    cy.get('.input').type('{enter}')
    cy.get('.preview').should('contain', '@posva')
  })

  it('searches with no result', () => {
    cy.visit('/defaults')
    cy.get('.input').type('@zzz')
    cy.get('.popover').should('be.visible')
      .should('contain', 'No result')
  })

  it('does not insert a space after mention', () => {
    cy.visit('/defaults')
    cy.get('.input').type('@{enter}abc')
    cy.get('.preview').should('contain', '@akryumabc')
  })
})
