import { faker } from "@faker-js/faker"

const products = {
  backpack: 0,
  bikeLight: 1,
  fleeceJacket: 2,
  tShirt: 3,
  tShirtRed: 4,
  Onesie: 5,
}
const personalData = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode("######"),
}

describe("Checkout", () => {
  beforeEach("Visit and Login", () => {
    cy.login()
  })
  context("Success Checkout", () => {
    it("Buy one product", () => {
      const productsList = [products.backpack]
      cy.addProductToCart(productsList)
      cy.goToCart()
      cy.fillPersonalDataAtCheckout(
        personalData.firstName,
        personalData.lastName,
        personalData.postalCode,
      )
      cy.validateCheckoutInfos(productsList)
      cy.finishOrder()
    })
    it("Buy two products", () => {
      const productsList = [products.backpack, products.fleeceJacket]
      cy.addProductToCart(productsList)
      cy.goToCart()
      cy.fillPersonalDataAtCheckout(
        personalData.firstName,
        personalData.lastName,
        personalData.postalCode,
      )
      cy.validateCheckoutInfos(productsList)
      cy.finishOrder()
    })
    it("Buy all products", () => {
      const productsList = [
        products.backpack,
        products.fleeceJacket,
        products.Onesie,
        products.bikeLight,
        products.tShirt,
        products.tShirtRed,
      ]
      cy.addProductToCart(productsList)
      cy.goToCart()
      cy.fillPersonalDataAtCheckout(
        personalData.firstName,
        personalData.lastName,
        personalData.postalCode,
      )
      cy.validateCheckoutInfos(productsList)
      cy.finishOrder()
    })
  })
})
