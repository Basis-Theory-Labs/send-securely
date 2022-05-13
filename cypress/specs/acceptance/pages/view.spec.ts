import Chance from 'chance';
import { getTranslation, randomLocale } from '@/support';

describe('View Secret page', () => {
  const chance = new Chance();
  let locale: string;
  const id = chance.guid();

  const visit = (): void => {
    cy.visit(`/${locale}/${id}`);
    cy.injectAxe();
  };

  beforeEach(() => {
    locale = randomLocale(false);
    cy.viewport(chance.pickone(['iphone-x', 'macbook-13', 'samsung-s10']));
  });

  it('should render important callouts and labels', () => {
    // set intercept before the page visit
    cy.intercept('GET', `/api/secrets/${id}/details`, {
      statusCode: 200,
    });
    visit();
    cy.contains('h2', getTranslation(locale, 'secrets.view.title'));
    cy.contains('button', getTranslation(locale, 'secrets.view.button'));
    cy.assertSecurityInfo(locale);
  });

  it('should handle 404 status code response from the API', () => {
    // set intercept before the page visit
    cy.intercept('GET', `/api/secrets/${id}/details`, {
      statusCode: 404,
    });
    // temporarily disable halting on uncaught client exceptions (used to redirect)
    cy.on('uncaught:exception', () => false);
    visit();
    cy.assert404(locale);
  });

  it('should handle 500 status code response from the API', () => {
    // set intercept before the page visit
    cy.intercept('GET', `/api/secrets/${id}/details`, {
      statusCode: 500,
    });
    // temporarily disable halting on uncaught client exceptions (used to redirect)
    cy.on('uncaught:exception', () => false);
    visit();
    cy.assert500(locale);
  });

  it('should reveal secret', () => {
    const data = `The package will arrive at ${chance.address()} by ${chance.weekday(
      {}
    )}`;

    // set intercept before the page visit
    cy.intercept('GET', `/api/secrets/${id}/details`, {
      statusCode: 200,
    });
    cy.intercept('GET', `/api/secrets/${id}`, {
      statusCode: 200,
      body: {
        id,
        data,
      },
      delay: 500,
    }).as('getSecret');

    visit();

    cy.contains('button', getTranslation(locale, 'secrets.view.button'))
      .click()
      .should('be.disabled');

    cy.wait('@getSecret');
    cy.contains(data);

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
