const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ivz8qn',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://petstore.swagger.io/v2'
  },
});
