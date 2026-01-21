/// <reference types="cypress" />

import App from 'App'

describe('App', () => {
  it('renders the table and button', () => {
    cy.mount(<App />)
    cy.contains('Engagement Hub — Full-Stack Challenge (Frontend)').should('be.visible')
  })
})
