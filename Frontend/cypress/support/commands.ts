Cypress.Commands.add("login", (email: string, password: string) => {
  cy.session(
    [email],
    () => {
      cy.visit("/login");

      cy.get('input[type="email"]').type(email);
      cy.get('input[type="password"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.get("aside").should("be.visible");
    },
    {
      validate() {
        cy.visit("/");

        cy.get("aside").should("be.visible");
      },
    },
  );
});

Cypress.Commands.add("logout", () => {
  cy.visit("/settings");

  cy.contains("Uitloggen").click();
  cy.url().should("include", "/login");
});
