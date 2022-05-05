import Chance from 'chance';
import type { StubMapping } from '../../../../../support/wiremock/types';

describe('create secret', () => {
  const chance = new Chance();

  describe('should create token from secret data with TTL', () => {
    const scenario = 'create secret token';
    let secretData, secretTtl, expectedTokenId;

    beforeEach(() => {
      secretData = chance.guid();
      secretTtl = chance.integer();
      expectedTokenId = chance.guid();

      cy.stubRequest(scenario, {
        request: {
          method: 'POST',
          urlPath: '/tokens/',
          bodyPatterns: [
            {
              equalToJson: {
                type: 'token',
                data: secretData,
                metadata: {
                  ttl: secretTtl,
                },
              },
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
});
