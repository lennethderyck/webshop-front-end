import 'cypress-file-upload';

describe("add painting form", () => {
  beforeEach(() => {
    cy.login('lenneth.deryck@student.hogent.be', '12345678');
  });

  it('h2 exists in homepage', () => {
    cy.visit('http://localhost:3000/');
    cy.get("h2").should('exist');
  });

  it('should add a painting', () => {
    const fixtureFile = '/Fabric17.jpg';
    cy.visit('http://localhost:3000/addPaintingForm');
    cy.wait(2000);
    cy.get('[data-cy=name_input]').type('Test', {
      force: true
    });
    cy.get('[data-cy=type_select]').select('Textile', {
      force: true
    });
    cy.get('[data-cy=price_input]').type('500', {
      force: true
    });
    cy.get('[data-cy=width_input]').type('50', {
      force: true
    });
    cy.get('[data-cy=height_input]').type('50', {
      force: true
    });
    cy.get('[data-cy=description_input]').type('Dit is een test', {
      force: true
    });
    cy.get('[data-cy=img_input]').attachFile(fixtureFile);
    cy.get('[data-cy=submit_painting]').click();

  });

});