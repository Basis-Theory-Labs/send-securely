import { Token } from '@basis-theory/basis-theory-elements-interfaces/models';
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
    JSON.stringify(mapping)
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
  (expectedCount: number, mapping: StubMappingRequest) => {
    cy.request(
      'POST',
      'http://localhost:8080/__admin/requests/count',
      JSON.stringify(mapping)
    ).then(({ body }) => {
      // eslint-disable-next-line jest/no-standalone-expect
      expect(body.count).to.eq(expectedCount);
    });
  }
);
