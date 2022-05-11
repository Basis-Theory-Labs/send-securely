import Chance from 'chance';
import { getTranslation, randomLocale } from '@/support';

import Chainable = Cypress.Chainable;

const chance = new Chance();

const getCreateButton = (
  locale: string
): Chainable<JQuery<HTMLButtonElement>> =>
  cy.contains('button', getTranslation(locale, 'secrets.create.button'));

const fillForm = (): { data: string; expiresIn: string; ttl: number } => {
  const secret = {
    data: `My ${chance.animal()} is called ${chance.name()} and it is ${chance.age()} years old.`,
    ...chance.pickone([
      {
        expiresIn: '10m',
        ttl: 600,
      },
      {
        expiresIn: '1h',
        ttl: 3600,
      },
      {
        expiresIn: '24h',
        ttl: 86400,
      },
    ]),
  };

  cy.get('textarea#secret-data').clear().type(secret.data);
  cy.get('#secret-expires-in').contains(secret.expiresIn).click();

  return secret;
};

describe('Index page', () => {
  let locale: string;

  beforeEach(() => {
    locale = randomLocale();
    cy.viewport(chance.pickone(['iphone-x', 'macbook-13', 'samsung-s10']));

    cy.visit('/', {
      headers: {
        'Accept-Language': locale,
      },
    });
    cy.injectAxe();
  });

  it('has no detectable a11y violations on load', () => {
    cy.checkA11y();
  });

  it('should render important callouts and labels', () => {
    cy.contains('h2', getTranslation(locale, 'secrets.create.title'));

    cy.get('textarea').should(
      'have.attr',
      'placeholder',
      getTranslation(locale, 'secrets.create.placeholder')
    );

    cy.contains('button', getTranslation(locale, 'secrets.create.button'));

    cy.assertSecurityInfo(locale);
  });

  it('should handle 500 status code response from the API', () => {
    // temporarily disable halting on uncaught client exceptions (used to redirect)
    cy.on('uncaught:exception', () => false);
    cy.intercept('POST', '/api/secrets', {
      statusCode: 500,
    });

    fillForm();
    getCreateButton(locale).click();
    cy.assert500(locale);
  });

  it('should handle 404 status code response from the API', () => {
    // temporarily disable halting on uncaught client exceptions (used to redirect)
    cy.on('uncaught:exception', () => false);
    cy.intercept('POST', '/api/secrets', {
      statusCode: 404,
    });

    fillForm();
    getCreateButton(locale).click();
    cy.assert404(locale);
  });

  it('should create secret', () => {
    getCreateButton(locale).should('be.disabled');

    const { data, ttl } = fillForm();
    const id = chance.guid();

    cy.intercept('POST', '/api/secrets', {
      statusCode: 200,
      body: {
        id,
        ttl,
      },
    }).as('createSecret');

    getCreateButton(locale).click();

    cy.wait('@createSecret').then(({ request }) => {
      expect(request.body).to.deep.eq({
        data,
        ttl,
      });
    });

    cy.contains('h2', getTranslation(locale, 'secrets.share.title'));

    cy.location('origin').then((origin) => {
      const link = `${origin}/${id}`;

      cy.get('input')
        .should('have.value', link)
        .should('have.attr', 'readonly');

      // stubs copy to clipboard fallback
      cy.window().then((win) => {
        cy.stub(win, 'prompt').returns({});
      });

      cy.contains(
        'button',
        getTranslation(locale, 'components.shared.CopyButton.copy')
      ).click();

      cy.contains(
        'button',
        getTranslation(locale, 'components.shared.CopyButton.copied')
      ).should('be.visible');
      cy.checkA11y();
    });
  });
});
