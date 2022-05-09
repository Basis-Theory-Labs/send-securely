import Chance from 'chance';
import { add } from 'date-fns';

describe('get secret details', () => {
  const chance = new Chance();
  let secretData, secretTtl, secretCreatedAt, tokenId;

  describe('secret details not expired', () => {
    const scenario = 'get secret details';

    beforeEach(() => {
      secretTtl = 1000;
      secretCreatedAt = new Date();
      secretData = chance.guid();
      tokenId = chance.guid();

      cy.stubGetTokenById(scenario, {
        id: tokenId,
        type: 'token',
        data: secretData,
        // eslint-disable-next-line camelcase
        created_at: secretCreatedAt.toISOString(),
        metadata: {
          ttl: secretTtl,
        },
      });
    });

    afterEach(() => {
      cy.clearStubs(scenario);
    });

    it('should return secret details in 200 OK', () => {
      cy.request('GET', `/api/secrets/${tokenId}/details`).then(
        ({ status, body }) => {
          expect(status).to.eq(200);
          expect(body).to.deep.eq({
            id: tokenId,
            timeLeft: add(secretCreatedAt, {
              seconds: secretTtl,
            }).toISOString(),
          });
        }
      );
    });
  });

  describe('should validate secret is not expired', () => {
    const scenario = 'get secret details expired';

    beforeEach(() => {
      secretTtl = 0;
      secretCreatedAt = new Date().toISOString();
      secretData = chance.guid();
      tokenId = chance.guid();

      cy.stubGetTokenById(scenario, {
        id: tokenId,
        type: 'token',
        data: secretData,
        // eslint-disable-next-line camelcase
        created_at: secretCreatedAt,
        metadata: {
          ttl: secretTtl,
        },
      });

      cy.stubRequest(scenario, {
        request: {
          method: 'DELETE',
          urlPath: `/tokens/${tokenId}`,
        },
        response: {
          status: 204,
        },
      });
    });

    afterEach(() => {
      cy.clearStubs(scenario);
    });

    it('should return 404 NOT_FOUND when secret is expired', () => {
      cy.request({
        method: 'GET',
        url: `/api/secrets/${tokenId}/details`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(404);
        expect(body).to.deep.eq({});
      });
    });

    it('should delete token after retrieving', () => {
      cy.request({
        method: 'GET',
        url: `/api/secrets/${tokenId}/details`,
        failOnStatusCode: false,
      });

      cy.verifyRequestCount(1, {
        method: 'DELETE',
        urlPath: `/tokens/${tokenId}`,
      });
    });
  });

  describe('secret details not found', () => {
    const scenario = 'get secret details not found';

    beforeEach(() => {
      cy.stubRequest(scenario, {
        request: {
          method: 'GET',
          urlPath: `/tokens/${tokenId}`,
        },
        response: {
          status: 404,
        },
      });
    });

    afterEach(() => {
      cy.clearStubs(scenario);
    });

    it('should return 404 NOT_FOUND when secret token does not exist', () => {
      cy.request({
        method: 'GET',
        url: `/api/secrets/${tokenId}/details`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(404);
        expect(body).to.deep.eq({});
      });
    });
  });
});
