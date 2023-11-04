const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    experimentalRunAllSpecs: false,
  },
  retries: { runMode: 1, openMode: 0 },
  scrollBehavior: "nearest",
})
