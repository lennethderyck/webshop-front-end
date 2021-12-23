describe("mijn eerste test", () => {
    it("de applicatie draait", () => {
      cy.visit("http://localhost:3000");
      cy.get("h2").should("exist");
    });

    it("moet inloggen", () => {
      cy.login('lenneth.deryck@student.hogent.be', '12345678');
    });
  });