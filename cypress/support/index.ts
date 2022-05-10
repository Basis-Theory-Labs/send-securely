// ***********************************************************
// This example support/index.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
// Import commands.ts using ES2015 syntax:
// / <reference types="cypress" />
import 'cypress-axe';
import { Token } from '@basis-theory/basis-theory-elements-interfaces/models';
import { StubMapping, StubMappingRequest } from '@/support/wiremock/types';
import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      clearStubs(scenario: string): void;
      stubRequest(scenario: string, mapping: StubMapping): void;
      stubGetTokenById(scenario: string, token: Token): void;
      verifyRequestCount(
        expectedCount: number,
        requestMapping: StubMappingRequest
      ): void;
    }
  }
}
