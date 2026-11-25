const EMAIL = "test@example.com";
const WACHTWOORD = "test1!";
const SUBMIT = 'button[type="submit"]';
const pad = (n) => String(n).padStart(2, "0");

const klikDag = (dag) => {
  cy.get('button[type="button"]')
    .filter(
      (_, el) =>
        el.textContent.trim() == String(dag) &&
        !el.querySelector("span.text-slate-400"),
    )
    .first()
    .click();
};

const openAanvraag = (isoDatum) => {
  cy.visit(
    isoDatum ? `/verlof/aanvragen?date=${isoDatum}` : "/verlof/aanvragen",
  );
  cy.contains("h1", "Verlof aanvragen").should("be.visible");
};

const willekeurigeWerkdagen = () => {
  let datum;

  do {
    const dagenVooruit = 60 + Cypress._.random(0, 3000);
    datum = new Date();
    datum.setDate(datum.getDate() + dagenVooruit);
  } while (datum.getDay() != 1 || datum.getDate() > 26);

  const iso = `${datum.getFullYear()}-${pad(datum.getMonth() + 1)}-${pad(datum.getDate())}`;

  return { iso, startDag: datum.getDate(), eindDag: datum.getDate() + 1 };
};

describe("verlof aanvragen", () => {
  beforeEach(() => {
    cy.login(EMAIL, WACHTWOORD);
  });

  describe("Een succesvolle verlof aanvraag", () => {
    it("dient een aanvraag in met type, periode en toelichting", () => {
      const { iso, startDag, eindDag } = willekeurigeWerkdagen();

      cy.intercept("POST", "/leaves/").as("maakVerlof");
      openAanvraag(iso);

      cy.get("#leave-type").select("Vakantie");
      klikDag(startDag);
      klikDag(eindDag);
      cy.contains("Gekozen:").should("be.visible");
      cy.get("#leave-comment").type("Ik wil op vakantie!");

      cy.contains("Totaal aangevraagd").parent().should("contain", "2 dagen");

      cy.get(SUBMIT).click();

      cy.wait("@maakVerlof").its("response.statusCode").should("eq", 201);
      cy.contains("Aanvraag ingediend").should("be.visible");

      cy.get("#leave-type").should("have.value", null);
      cy.get("#leave-comment").should("have.value", "");
    });
  });

  describe("Verlof aanvragen als je te ver in de toekomst probeert in te vullen", () => {
    it("weigert verlof van 19 t/m 21 mei 2077", () => {
      openAanvraag("2077-05-19");

      cy.get("#leave-type").select("Vakantie");
      klikDag(19);
      klikDag(21);
      cy.contains("Gekozen: 19 mei 2077 t/m 21 mei 2077").should("be.visible");
      cy.get("#leave-comment").type("Ik wil op vakantie!");

      cy.get(SUBMIT).click();

      cy.contains("Aanvraag ingediend").should("not.exist");
      cy.get('[role="alert"]').should("be.visible");
    });
  });

  describe("Verlof aanvragen als je geen reden invuld", () => {
    it("toont een foutmelding en verstuurt niets", () => {
      cy.intercept("POST", "/leaves/").as("maakVerlof");
      const { iso, startDag, eindDag } = willekeurigeWerkdagen();
      openAanvraag(iso);

      klikDag(startDag);
      klikDag(eindDag);
      cy.get(SUBMIT).click();

      cy.contains("Kies een verloftype.").should("be.visible");
      cy.get("#leave-type").should("have.attr", "aria-invalid", "true");
      cy.contains("Aanvraag ingediend").should("not.exist");
      cy.get("@maakVerlof.all").should("have.length", 0);
    });
  });

  describe("Verlof aanvragen als je geen einddatum invuld", () => {
    it("vraagt om een periode als er helemaal niets is gekozen", () => {
      cy.intercept("POST", "/leaves/").as("maakVerlof");
      openAanvraag();

      cy.get("#leave-type").select("Vakantie");
      cy.get(SUBMIT).click();

      cy.contains("Kies je verlofperiode.").should("be.visible");
      cy.get("@maakVerlof.all").should("have.length", 0);
    });

    it("telt een klik op een dag als een verlofperiode van een dag", () => {
      const { iso, startDag } = willekeurigeWerkdagen();
      openAanvraag(iso);

      klikDag(startDag);

      cy.contains("Kies nu de laatste dag van je verlof.").should("be.visible");
      cy.contains("Totaal aangevraagd").parent().should("contain", "1 dag");
    });
  });

  describe("Verlof als je niet ingelogd ben", () => {
    it("stuurt je naar de loginpagina na uitloggen", () => {
      openAanvraag();

      cy.contains("button", "Uitloggen").click();
      cy.url().should("include", "/login");

      cy.visit("/verlof/aanvragen");
      cy.url().should("include", "/login");
      cy.contains("h1", "Inloggen").should("be.visible");
    });
  });

  describe("Verlof aanvragen als ze veel requests sturen", () => {
    it("toont een melding wanneer de API de aanvragen afremt", () => {
      const { iso, startDag, eindDag } = willekeurigeWerkdagen();

      cy.window().then((win) => {
        const token = win.localStorage.getItem("auth_token");

        Cypress._.times(65, () =>
          cy.request({
            url: "/leaves/",
            headers: { Authorization: `Token ${token}` },
            failOnStatusCode: false,
          }),
        );
      });

      cy.intercept("POST", "/leaves/").as("maakVerlof");
      openAanvraag(iso);

      cy.get("#leave-type").select("Vakantie");
      klikDag(startDag);
      klikDag(eindDag);
      cy.get(SUBMIT).click();

      cy.wait("@maakVerlof").its("response.statusCode").should("eq", 429);
      cy.contains("Je aanvraag is niet verstuurd").should("be.visible");
      cy.contains("Aanvraag ingediend").should("not.exist");
    });
  });
});
