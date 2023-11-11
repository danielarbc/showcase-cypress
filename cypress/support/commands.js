// * Overwrite

Cypress.Commands.overwrite("type", (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false
    // create our own log with masked message
    Cypress.log({
      $el: element,
      name: "type",
      message: "*".repeat(text.length),
    })
  }

  return originalFn(element, text, options)
})

// * Login

Cypress.Commands.add("login", (user, password) => {
  const TEST_IDS = {
    usernameField: 'input[data-test="username"]',
    passwordField: 'input[data-test="password"]',
    loginButton: 'input[data-test="login-button"]',
  }
  user = Cypress.env("STANDARD_USER")
  password = Cypress.env("PASSWORD")
  cy.visit("/")
  cy.get(TEST_IDS.usernameField).type(user)
  cy.get(TEST_IDS.passwordField).type(password, { sensitive: true })
  cy.get(TEST_IDS.loginButton).click()
})

// * Checkout

Cypress.Commands.add("addProductToCart", (productNumberList) => {
  for (let index in productNumberList) {
    cy.fixture("products.json").then((products) => {
      const product = products[productNumberList[index]]
      cy.get(`[data-test="add-to-cart-${product.dataTestName}"]`).click()
    })
  }
})

Cypress.Commands.add("goToCart", () => {
  cy.get(".shopping_cart_link").click()
  cy.get('[data-test="checkout"]').click()
})

Cypress.Commands.add(
  "fillPersonalDataAtCheckout",
  (firstName, lastName, postalCode) => {
    cy.get('[data-test="firstName"]').type(firstName)
    cy.get('[data-test="lastName"]').type(lastName)
    cy.get('[data-test="postalCode"]').type(postalCode)
    cy.get('[data-test="continue"]').click()
  },
)

Cypress.Commands.add("validateCheckoutInfos", (productNumberList) => {
  cy.fixture("products.json").then((products) => {
    let productsList = []
    let productNameList = []
    let productDescriptionList = []
    let productPriceList = []
    for (let index in productNumberList) {
      productsList.push(products[productNumberList[index]])
      productNameList.push(productsList[index].productName)
      productDescriptionList.push(productsList[index].productDescription)
      productPriceList.push(productsList[index].productPrice)
    }

    cy.get(".inventory_item_name")
      .should("have.length", productNumberList.length)
      .then(($els) => {
        return Cypress._.map(Cypress.$.makeArray($els), "innerText")
      })
      .should("deep.equal", productNameList)

    cy.get(".inventory_item_desc")
      .should("have.length", productNumberList.length)
      .then(($els) => {
        return Cypress._.map(Cypress.$.makeArray($els), "innerText")
      })
      .should("deep.equal", productDescriptionList)

    cy.get(".inventory_item_price")
      .should("have.length", productNumberList.length)
      .then(($els) => {
        return Cypress._.map(Cypress.$.makeArray($els), "innerText")
      })
      .should("deep.equal", productPriceList)
  })

  cy.get(".summary_value_label").contains("SauceCard #31337")
  cy.get(".summary_value_label").contains("Free Pony Express Delivery!")
  cy.get(".summary_subtotal_label")
    .invoke("text")
    .should(
      "match",
      /Item total: \${1,}([0-9]{1,}\.[0-9]{1,}|[0-9]{1,})\.([0-9]{2})/,
    )
  cy.get(".summary_tax_label")
    .invoke("text")
    .should("match", /Tax: \${1,}([0-9]{1,}\.[0-9]{1,}|[0-9]{1,})\.([0-9]{2})/)
  cy.get(".summary_info_label.summary_total_label")
    .invoke("text")
    .should(
      "match",
      /Total: \${1,}([0-9]{1,}\.[0-9]{1,}|[0-9]{1,})\.([0-9]{2})/,
    )
})

Cypress.Commands.add("finishOrder", () => {
  cy.get('[data-test="finish"]').click()
  cy.get(".complete-header").contains("Thank you for your order!")
  cy.get(".complete-text").contains(
    "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
  )
  cy.get('[data-test="back-to-products"]').click()
})
