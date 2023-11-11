/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Login in application
     * If you don't put any parameters we will use the username and password in cypress.env.json
     * @param username string
     * @param password string
     * @example
     * cy.login()
     * cy.login(username,password)
     */
    login(username: string, password: string): Chainable<any>
    /**
     * Add a list of products to cart
     * @param productList array
     * @example
     * cy.addProductToCart([product1, product2])
     */
    addProductToCart(productList: array): Chainable<any>
    /**
     * Add a list of products to cart
     * @param firstName string
     * @param secondName string
     * @param postalCode string
     * @example
     * cy.fillPersonalDataAtCheckout(firstName, secondName, postalCode)
     */
    fillPersonalDataAtCheckout(
      firstName: string,
      secondName: string,
      postalCode: string,
    ): Chainable<any>
    /**
     * Validate the information of list of products added to cart like name, description and price
     * @param productList array
     * @example
     * cy.validateCheckoutInfos([product1, product2])
     */
    validateCheckoutInfos(productList: array): Chainable<any>
    /**
     * After add the products to card and fill the personal information, finish order
     * @example
     * cy.finishOrder()
     */
    finishOrder(): Chainable<any>
  }
}
