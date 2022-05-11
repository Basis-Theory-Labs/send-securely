import { Token } from '@basis-theory/basis-theory-elements-interfaces/models';
import snakecaseKeys from 'snakecase-keys';
import { getTranslation } from '@/support/index';
import type { StubMapping, StubMappingRequest } from './wiremock/types';

Cypress.Commands.add('stubRequest', (scenario: string, stub: StubMapping) => {
  const mappingWithScenarioMetadata = {
    ...stub,
    metadata: {
      ...stub.metadata,
      scenario,
    },
  };

  cy.request(
    'POST',
    'http://localhost:8080/__admin/mappings',
    JSON.stringify(mappingWithScenarioMetadata)
  );
});

Cypress.Commands.add('stubGetTokenById', (scenario: string, token: Token) => {
  const mapping = {
    request: {
      method: 'GET',
      urlPath: `/tokens/${token.id}`,
    },
    response: {
      status: 200,
      jsonBody: token,
    },
    metadata: {
      scenario,
    },
  };

  cy.request(
    'POST',
    'http://localhost:8080/__admin/mappings',
    JSON.stringify(snakecaseKeys(mapping, { deep: false }))
  );
});

Cypress.Commands.add('clearStubs', (scenario: string) => {
  cy.request(
    'POST',
    'http://localhost:8080/__admin/mappings/remove-by-metadata',
    JSON.stringify({
      matchesJsonPath: {
        expression: '$.scenario',
        equalTo: scenario,
      },
    })
  );
});

Cypress.Commands.add(
  'verifyRequestCount',
  (expectedCount: number, requestMapping: StubMappingRequest) => {
    cy.request(
      'POST',
      'http://localhost:8080/__admin/requests/count',
      JSON.stringify(requestMapping)
    ).then(({ body }) => {
      expect(body.count).to.eq(expectedCount);
    });
  }
);

Cypress.Commands.add('assert500', (locale: string) => {
  cy.contains(getTranslation(locale, 'components.500.message'));
  cy.location('pathname').should('match', /.*?\/500/u);
  cy.injectAxe();
  cy.contains('a', getTranslation(locale, 'common.goToHome'));
  cy.checkA11y();
});

Cypress.Commands.add('assert404', (locale: string) => {
  cy.contains(getTranslation(locale, 'components.404.message'));
  cy.location('pathname').should('match', /.*?\/404/u);
  cy.injectAxe();
  cy.contains('a', getTranslation(locale, 'common.goToHome'));
  cy.checkA11y();
});
