import './commands'
import { mount } from 'cypress/react'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Cypress mount with ThemeProvider
       */
      mount: typeof mount
    }
  }
}
