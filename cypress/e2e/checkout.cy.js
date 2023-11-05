import { faker } from "@faker-js/faker"

const product = {
  dataTestName: "backpack",
}
const personalData = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode("######"),
}

describe("Checkout", () => {
  beforeEach("Visit", () => {
    cy.login()
  })
  it("Success checkout", () => {
    cy.addProductToCart(product.dataTestName)
    cy.fillPersonalDataAtCheckout(
      personalData.firstName,
      personalData.lastName,
      personalData.postalCode,
    )
    cy.validateCheckoutInfosAndFinishOrder()
  })
})
