import 'cypress-file-upload';

describe("Painting tests", () => {
  beforeEach(() => {
    cy.login('lenneth.deryck@student.hogent.be', '12345678');
  });

  it("shows paintings", () => {
    cy.visit("http://localhost:3000/products");
    cy.get("[data-cy=painting]").eq(1).should("have.length", 1);
    cy.get("[data-cy=painting_name]").eq(1).contains("Red");
    cy.get("[data-cy=painting_price]").eq(1).contains("€1200.99");
  });

  it("very slow response", () => {
    cy.intercept(
      "http://localhost:9000/api/paintings?limit=25&offset=0",
      (req) => {
        req.on("response", (res) => {
          res.setDelay(3000);
        });
      }
    ).as("slowResponse");
    cy.visit("http://localhost:3000/products");
    cy.get("[data-cy=loading]").should("be.visible");
    cy.get("[data-cy=loading]").should("not.exist");
  });
  it('should add a painting to cart', () => {
    cy.visit('http://localhost:3000/products');

    cy.get("[data-cy=painting_img]").first().click();
    cy.get("[data-cy=addToCart-btn]").click();
    cy.visit('http://localhost:3000/order');
    cy.wait(2000);
    cy.get("[data-cy=checkout-btn]").click();
    cy.visit('http://localhost:3000/myorders');
  });

  it('should edit a painting', () => {
    cy.visit('http://localhost:3000/productsAdmin');

    cy.get("[data-cy=editPainting-btn]").first().click({
      force: true
    });
    cy.get('[data-cy=price_input]').clear({
      force: true
    });
    cy.get('[data-cy=price_input]').type('909', {
      force: true
    });
    cy.get('[data-cy=submit_painting]').click();
  });

});