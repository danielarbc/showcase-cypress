const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    failOnStatusCode: false,
    experimentalRunAllSpecs: false,
  },
  retries: { runMode: 1, openMode: 0 },
  scrollBehavior: "nearest",
  chromeWebSecurity: false,
})
