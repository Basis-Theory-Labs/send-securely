import Chance from 'chance';
import type { StubMapping } from '@/support/wiremock/types';

describe('create secret', () => {
  const chance = new Chance();
  let secretData, secretTtl, expectedTokenId;

  const ttls = [600, 3600, 86400];

  beforeEach(() => {
    secretData = chance.guid();
    secretTtl = chance.pickone(ttls);
    expectedTokenId = chance.guid();
  });

  describe('should create secret', () => {
    const scenario = 'create secret token';

    beforeEach(() => {
      cy.stubRequest(scenario, {
        request: {
          method: 'POST',
          urlPath: '/tokens/',
          bodyPatterns: [
            {
              equalToJson: {
                type: 'token',
                data: secretData,
                // eslint-disable-next-line no-template-curly-in-string,camelcase
                expires_at: '${json-unit.any-string}',
              },
              ignoreExtraElements: true,
            },
          ],
        },
        response: {
          status: 201,
          jsonBody: {
            id: expectedTokenId,
            type: 'token',
          },
        },
      } as StubMapping);
    });

    afterEach(() => {
      cy.clearStubs(scenario);
    });

    it('should return created token identifier in 200 OK', () => {
      cy.request('POST', '/api/secrets', {
        data: secretData,
        ttl: secretTtl,
      }).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body).to.deep.eq({
          id: expectedTokenId,
          ttl: secretTtl,
        });
      });
    });
  });

  describe('should handle create token errors', () => {
    const scenario = 'create secret token';

    beforeEach(() => {
      cy.stubRequest(scenario, {
        request: {
          method: 'POST',
          urlPath: '/tokens/',
          bodyPatterns: [
            {
              equalToJson: {
                type: 'token',
                data: secretData,
                // eslint-disable-next-line camelcase,no-template-curly-in-string
                expires_at: '${json-unit.any-string}',
              },
            },
          ],
        },
        response: {
          status: 400,
          jsonBody: {
            status: 400,
          },
        },
      } as StubMapping);
    });

    afterEach(() => {
      cy.clearStubs(scenario);
    });

    it('should return 500 INTERNAL_SERVER_ERROR when create token request fails', () => {
      cy.request({
        method: 'POST',
        url: '/api/secrets',
        body: {
          data: secretData,
          ttl: secretTtl,
        },
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(500);
        expect(body).to.eq('Internal Server Error');
      });
    });
  });
});
