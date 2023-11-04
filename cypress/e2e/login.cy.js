describe("Login", () => {
  beforeEach("Visit", () => {
    cy.visit("/")
  })
  it("Success login", () => {
    cy.get('input[data-test="username"]').type(Cypress.env("STANDARD_USER"))
    cy.get('input[data-test="password"]').type(Cypress.env("PASSWORD"))
    cy.get('input[data-test="login-button"]').click()
    cy.url().should("include", "/inventory.html")
  })
  it("Login with empty email - should show an error", () => {
    cy.get('input[data-test="password"]').type(Cypress.env("PASSWORD"))
    cy.get('input[data-test="login-button"]').click()
    cy.get('h3[data-test="error"]').should(
      "have.text",
      "Epic sadface: Username is required",
    )
  })
  it("Login with wrong email - should show an error", () => {
    cy.get('input[data-test="username"]').type("example")
    cy.get('input[data-test="password"]').type(Cypress.env("PASSWORD"))
    cy.get('input[data-test="login-button"]').click()
    cy.get('h3[data-test="error"]').should(
      "have.text",
      "Epic sadface: Username and password do not match any user in this service",
    )
  })
})
