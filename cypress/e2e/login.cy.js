const TEST_IDS = {
  usernameField: 'input[data-test="username"]',
  passwordField: 'input[data-test="password"]',
  loginButton: 'input[data-test="login-button"]',
  loginErrorMessage: 'h3[data-test="error"]',
}

const MESSAGES = {
  requiredUsernameError: "Epic sadface: Username is required",
  requiredPasswordError: "Epic sadface: Password is required",
  unmatchedUsernameError:
    "Epic sadface: Username and password do not match any user in this service",
  lockedOutUserError: "Epic sadface: Sorry, this user has been locked out.",
}

describe("Login", () => {
  beforeEach("Visit", () => {
    cy.visit("/")
  })
  it("Success login", () => {
    cy.get(TEST_IDS.usernameField).type(Cypress.env("STANDARD_USER"))
    cy.get(TEST_IDS.passwordField).type(Cypress.env("PASSWORD"))
    cy.get(TEST_IDS.loginButton).click()
    cy.url().should("include", "/inventory.html")
  })
  it("Login with empty username - should show an error", () => {
    cy.get(TEST_IDS.passwordField).type(Cypress.env("PASSWORD"))
    cy.get(TEST_IDS.loginButton).click()
    cy.get(TEST_IDS.loginErrorMessage).should(
      "have.text",
      MESSAGES.requiredUsernameError,
    )
  })
  it("Login with wrong username - should show an error", () => {
    cy.get(TEST_IDS.usernameField).type("example")
    cy.get(TEST_IDS.passwordField).type(Cypress.env("PASSWORD"))
    cy.get(TEST_IDS.loginButton).click()
    cy.get(TEST_IDS.loginErrorMessage).should(
      "have.text",
      MESSAGES.unmatchedUsernameError,
    )
  })
  it("Login with empty password - should show an error", () => {
    cy.get(TEST_IDS.usernameField).type(Cypress.env("STANDARD_USER"))
    cy.get(TEST_IDS.loginButton).click()
    cy.get(TEST_IDS.loginErrorMessage).should(
      "have.text",
      MESSAGES.requiredPasswordError,
    )
  })
  it("Login with wrong password - should show an error", () => {
    cy.get(TEST_IDS.usernameField).type(Cypress.env("STANDARD_USER"))
    cy.get(TEST_IDS.passwordField).type("example")
    cy.get(TEST_IDS.loginButton).click()
    cy.get(TEST_IDS.loginErrorMessage).should(
      "have.text",
      MESSAGES.unmatchedUsernameError,
    )
  })
  it("Login with locked out user", () => {
    cy.get(TEST_IDS.usernameField).type(Cypress.env("LOCKED_OUT_USER"))
    cy.get(TEST_IDS.passwordField).type(Cypress.env("PASSWORD"))
    cy.get(TEST_IDS.loginButton).click()
    cy.get(TEST_IDS.loginErrorMessage).should(
      "have.text",
      MESSAGES.lockedOutUserError,
    )
  })
})
