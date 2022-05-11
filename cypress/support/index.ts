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
import type { Token } from '@basis-theory/basis-theory-elements-interfaces/models';
import Chance from 'chance';
import 'cypress-axe';
import _get from 'lodash/get';
import { StubMapping, StubMappingRequest } from '@/support/wiremock/types';
import enCommon from '../../public/locales/en/common.json';
import enComponents from '../../public/locales/en/components.json';
import enSecrets from '../../public/locales/en/secrets.json';
import ptBrCommon from '../../public/locales/pt-BR/common.json';
import ptBrComponents from '../../public/locales/pt-BR/components.json';
import ptBrSecrets from '../../public/locales/pt-BR/secrets.json';
import './commands';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
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
      assert500(locale: string): void;
      assert404(locale: string): void;
    }
  }
}

const locales = {
  en: {
    common: enCommon,
    components: enComponents,
    secrets: enSecrets,
  },
  'pt-BR': {
    common: ptBrCommon,
    components: ptBrComponents,
    secrets: ptBrSecrets,
  },
};

const chance = new Chance();

const randomLocale = (): string =>
  chance.pickone(['pt-BR', 'en', chance.locale({ region: true })]);

const getTranslation = (locale: string, key: string): string =>
  _get(locales[locale] || locales.en, key);

export { locales, getTranslation, randomLocale };
