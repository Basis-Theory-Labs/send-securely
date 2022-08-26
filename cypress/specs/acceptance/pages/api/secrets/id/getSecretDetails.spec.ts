import Chance from 'chance';

describe('get secret details', () => {
  const chance = new Chance();
  let secretData, secretTtl, secretCreatedAt, secretExpiresAt, tokenId;

  describe('secret details not expired', () => {
    const scenario = 'get secret details';

    beforeEach(() => {
      secretTtl = 1000;
      secretCreatedAt = new Date();
      secretExpiresAt = new Date();
      secretExpiresAt.setTime(secretExpiresAt.getTime() + secretTtl * 1000);
      secretData = chance.guid();
      tokenId = chance.guid();

      cy.stubGetTokenById(scenario, {
        id: tokenId,
        type: 'token',
        tenantId: chance.guid(),
        data: secretData,
        createdAt: secretCreatedAt.toISOString(),
        expiresAt: secretExpiresAt.toISOString(),
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
          });
        }
      );
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
