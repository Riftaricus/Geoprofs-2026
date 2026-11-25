describe("verlof aanvragen", () => {
  beforeEach(() => {
    cy.login("test@example.com", "password123");
  });

  describe("Een succesvolle verlof aanvraag", () => {
    it("navigeert naar de verlof pagina", () => {
      cy.visit("/verlof/aanvragen");
      cy.get('input[placeholder="Kies een verloftype"]'.type("Vakantie"));
      cy.get('input[placeholder="Toelichting"]'.type("Ik wil op vakantie!"));
      cy.get('button[type="submit"]').click();
      cy.contains("Aanvraag ingediend");
    });
  });
  describe("Verlof aanvragen als je te ver in de toekomst probeert in te vullen", () => {
    it("navigeert naar de verlof pagina", () => {
      cy.visit("/verlof/aanvragen");
      cy.get('input[placeholder="Kies een verloftype"]'.type("Vakantie"));
      //hier moeten nog de velofkeuze naar 2077 mei 19-21
      cy.get('input[placeholder="Toelichting"]'.type("Ik wil op vakantie!"));
      cy.get('button[type="submit"]').click();
      cy.contains("Aanvraag ingediend");
    });
  });
  describe("Verlof aanvragen als je geen reden invuld", () => {
    it("navigeert naar de verlof pagina", () => {
      cy.visit("/verlof/aanvragen");
      cy.get('button[type="submit"]').click();
      //nog planning
      cy.contains("kies een verloftype.");
    });
  });
  describe("Verlof aanvragen als je geen einddatum invuld", () => {
    it("navigeert naar de verlof pagina", () => {
      cy.visit("/verlof/aanvragen");
      cy.get('button[type="submit"]').click();
      cy.contains("geen einddatum geselecteerd.");
    });
  });
  describe("Verlof aanvragen als ze veel requests sturen", () => {
    //moet nog in een loop worden gezet
    it("navigeert naar de verlof pagina", () => {
      cy.visit("/verlof/aanvragen");
      cy.get('input[placeholder="Kies een verloftype"]'.type("Vakantie"));

      cy.get('input[placeholder="Toelichting"]'.type("Ik wil op vakantie!"));
      cy.get('button[type="submit"]').click();
      cy.contains("Aanvraag ingediend");
    });
  });
  describe("Verlof als je niet ingelogd ben", () => {
    cy.visit("/logout");

    cy.contains("Uitloggen").click();
    cy.url().should("include", "/login");

    cy.visit("/verlof/aanvragen")
    cy.url().should("include", "/login")
  });
});
