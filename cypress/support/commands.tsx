import { mount } from 'cypress/react'
import '@cypress/code-coverage/support'
import '@ui5/webcomponents-cypress-commands'
import '@testing-library/cypress/add-commands'

/**
 * Cypress mount command customization
 * You can use this to set up contexts, providers, etc.
 */
Cypress.Commands.add('mount', (component, options) => {
  return mount(component, options)
})
