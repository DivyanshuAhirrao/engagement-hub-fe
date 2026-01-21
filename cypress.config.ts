import { defineConfig } from 'cypress'
import coverageTask from '@cypress/code-coverage/task.js'

export default defineConfig({
  component: {
    setupNodeEvents(on, config) {
      coverageTask(on, config)

      return config
    },
    specPattern: '**/*.cy.{ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    includeShadowDom: true,
    viewportWidth: 1000,
    viewportHeight: 660,
  },
})
