import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: 'http://localhost:3000/',
    specPattern: 'cypress/specs/**/*.{js,jsx,ts,tsx}',
    fixturesFolder: false,
    retries: {
      runMode: 0,
      openMode: 0
    }
  }
})
