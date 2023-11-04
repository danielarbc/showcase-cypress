describe("Login", () => {
  it("Success login", () => {
    cy.visit("/")
    cy.get('input[data-test="username"]').type(Cypress.env("STANDARD_USER"))
    cy.get('input[data-test="password"]').type(Cypress.env("PASSWORD"))
    cy.get('input[data-test="login-button"]').click()
    cy.url().should("include", "/inventory.html")
  })
})
