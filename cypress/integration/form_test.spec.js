

const name = "Guillermo"
const email = `${name}@lambda.com`
const password = '12345'

it("can navigate to this site", () => {
    cy.visit('http://localhost:3000')
})


// it(`has blank input invalid`, () => {
//     cy.get('[data-cy_username_input="cy_username_input"]').type('a{backspace}')
//     cy.contains('Name cannot be blank')
// })

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


it("if inputs are empty", () => {

    cy.get('[data-cy_username_input="cy_username_input"]').type("Clear this text")
        .should("have.value", "Clear this text")
        .clear()
        .should("have.value", "")


    cy.get('input[name="email"]').type("Clear this text")
        .should("have.value", "Clear this text")
        .clear()
        .should("have.value", "")

    cy.get('input[name="password"]').type("Clear this text")
        .should("have.value", "Clear this text")
        .clear()
        .should("have.value", "")

})


//yup axios react router dom and cypress