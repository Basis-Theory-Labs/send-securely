describe('get configs', () => {
  it('should return a 200 OK with configs for GET on configs', () => {
    cy.request({
      method: 'GET',
      url: '/api/configs',
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body).to.deep.eq({});
    });
  });
});
