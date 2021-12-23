// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (email, password) =>{
    cy.intercept('http://localhost:9000/api/users/login').as('login');
    cy.visit('http://localhost:3000/signIn');

    cy.get('[data-cy=email_input').type(email);
    cy.get('[data-cy=password_input').type(password);
    cy.get('[data-cy=login_btn').click();
    cy.wait('@login');
});

Cypress.Commands.add("get$", (selector) => {
    return cy.wrap(Cypress.$(selector)).should("have.length.gte", 1);
  });