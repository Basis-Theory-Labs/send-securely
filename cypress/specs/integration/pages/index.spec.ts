import { fillSecretForm, getCreateButton } from '@/support';

describe('secret lifecycle', () => {
  it('should perform full secret lifecycle through UI', () => {
    cy.intercept('POST', '/api/secrets').as('createSecret');
    cy.intercept('GET', '/api/secrets/*').as('getSecret');

    cy.visit('/');
    const { data } = fillSecretForm();

    getCreateButton().click();

    cy.wait('@createSecret');

    cy.get('input[readonly]')
      .invoke('val')
      .then((url: string) => {
        // Visit secret URL #1
        cy.visit(url);
        cy.contains('button', 'Open Secret').click();
        cy.wait('@getSecret');
        cy.contains(data);

        // Visit secret URL #2
        // temporarily disable halting on uncaught client exceptions (used to redirect)
        cy.on('uncaught:exception', () => false);
        cy.visit(url);
        cy.contains('Secret not found.');
      });
  });
});
