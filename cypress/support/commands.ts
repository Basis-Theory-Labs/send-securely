import type { StubMapping } from './wiremock/types';

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
