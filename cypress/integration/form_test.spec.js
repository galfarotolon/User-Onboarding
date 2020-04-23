import { v4 as uuid } from 'uuid'

const name = "Guillermo"
const email = `${name}@lambda.com`
const password = '12345'

it("can navigate to this site", () => {
    cy.visit('http://localhost:3000')
})


it('can submit a user', () => {
    cy.get('[data-cy_username_input="cy_username_input"]')
        .type(name)
        .should('have.value', name)

    cy.get('input[name="email"]')
        .type(email)
        .should('have.value', email)

    cy.get('input[name="password"]')
        .type(password)
        .should('have.value', password)

    cy.get('[data-cy_checkbox_input="cy_checkbox_input"]')
        .check()
        .should('have.checked')

    cy.contains("submit")
        .click()


})