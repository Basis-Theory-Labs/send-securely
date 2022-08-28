import Chance from 'chance';

describe('get secret by ID', () => {
  const chance = new Chance();
  let secretData, secretTtl, secretCreatedAt, secretExpiresAt, tokenId;

  describe('should retrieve secret when not expired', () => {
    const scenario = 'get secret';

    beforeEach(() => {
      secretTtl = 1000;
      secretCreatedAt = new Date().toISOString();
      secretExpiresAt = new Date();
      secretExpiresAt.setTime(secretExpiresAt.getTime() + secretTtl * 1000);
      secretData = chance.guid();
      tokenId = chance.guid();

      cy.stubGetTokenById(scenario, {
        id: tokenId,
        type: 'token',
        tenantId: chance.guid(),
        data: secretData,
        createdAt: secretCreatedAt,
        expiresAt: secretExpiresAt.toISOString(),
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

    it('should return secret data in 200 OK', () => {
      cy.request('GET', `/api/secrets/${tokenId}`).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body).to.deep.eq({
          data: secretData,
        });
      });
    });

    it('should delete token after retrieving', () => {
      cy.request('GET', `/api/secrets/${tokenId}`);

      cy.verifyRequestCount(1, {
        method: 'DELETE',
        urlPath: `/tokens/${tokenId}`,
      });
    });
  });

  describe('secret not found', () => {
    const scenario = 'get secret not found';

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
        url: `/api/secrets/${chance.guid()}`,
        failOnStatusCode: false,
      }).then(({ status }) => {
        expect(status).to.eq(404);
      });
    });
  });
});
