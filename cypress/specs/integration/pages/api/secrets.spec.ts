import Chance from 'chance';

describe('secrets', () => {
  const chance = new Chance();

  it('should perform full secret lifecycle through API', () => {
    const secret = {
      data: chance.guid(),
      ttl: chance.pickone([600, 3600, 86400]),
    };

    // CREATE
    cy.request('POST', '/api/secrets', secret).then(({ status, body }) => {
      expect(status).to.eq(200);
      cy.wrap(body.id).as('secretId');
    });

    // READ DETAILS
    cy.get('@secretId').then((secretId) => {
      cy.request('GET', `/api/secrets/${secretId}/details`).then(
        ({ status, body }) => {
          expect(status).to.eq(200);
          expect(body.id).to.eq(secretId);
        }
      );
    });

    // READ SECRET
    cy.get('@secretId').then((secretId) => {
      cy.request('GET', `/api/secrets/${secretId}`)
        .as('readSecret')
        .then(({ status, body }) => {
          expect(status).to.eq(200);
          expect(body).to.deep.eq({
            data: secret.data,
          });
        });
    });

    // READ SECRET AGAIN
    // Ensure second request awaits for first request to complete
    cy.get('@readSecret').then(() => {
      cy.get('@secretId').then((secretId) => {
        cy.request({
          method: 'GET',
          url: `/api/secrets/${secretId}`,
          failOnStatusCode: false,
        }).then(({ status, body }) => {
          expect(status).to.eq(404);
          expect(body).to.deep.eq({});
        });
      });
    });

    // READ SECRET DETAILS AGAIN
    // Ensure request awaits for first read secret request to complete
    cy.get('@readSecret').then(() => {
      cy.get('@secretId').then((secretId) => {
        cy.request({
          method: 'GET',
          url: `/api/secrets/${secretId}/details`,
          failOnStatusCode: false,
        }).then(({ status, body }) => {
          expect(status).to.eq(404);
          expect(body).to.deep.eq({});
        });
      });
    });
  });
});
