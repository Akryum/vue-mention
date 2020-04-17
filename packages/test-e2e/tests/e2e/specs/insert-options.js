describe('insert space', () => {
  it('inserts a space after mention', () => {
    cy.visit('/insert-space')
    cy.get('.input').type('@{enter}abc')
    cy.get('.preview').should('contain', '@akryum abc')
  })
})

describe('omit key', () => {
  it('does not insert the key before mention', () => {
    cy.visit('/omit-key')
    cy.get('.input').type('@{enter}')
    cy.get('.preview').should('contain', 'akryum')
  })
})

describe('map insert', () => {
  it('maps the inserted value', () => {
    cy.visit('/map-insert')
    cy.get('.input').type('@{enter}')
    cy.get('.preview').should('contain', '@AKRYUM')
  })
})
