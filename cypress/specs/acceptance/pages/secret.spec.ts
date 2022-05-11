import Chance from 'chance';
import { getTranslation, randomLocale } from '@/support';

const chance = new Chance();

describe('Secret page', () => {
  const locale = randomLocale(false);
  const id = chance.guid();

  beforeEach(() => {
    cy.viewport(chance.pickone(['iphone-x', 'macbook-13', 'samsung-s10']));
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

    cy.visit(`/${locale}/${id}`);
    cy.injectAxe();
    cy.checkA11y();

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
