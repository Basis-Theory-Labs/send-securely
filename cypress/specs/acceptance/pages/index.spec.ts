import Chance from 'chance';

const chance = new Chance();

['pt-BR', chance.locale({ region: true })].forEach((locale) => {
  describe(`Index page (${locale})`, () => {
    beforeEach(() => {
      cy.viewport(chance.pickone(['iphone-x', 'macbook-13', 'samsung-s10']));

      cy.visit('/', {
        headers: {
          'Accept-Language': locale,
        },
      });
      cy.injectAxe();
    });

    it('has no detectable a11y violations on load', () => {
      cy.checkA11y();
    });

    it('should render important callouts and labels', () => {
      const verbiage = {
        'pt-BR': {
          h2: 'Compartilhe segredos sem a pegada digital.',
          placeholder:
            'Senhas, credenciais, chaves de API ou qualquer coisa...',
          actionButton: 'Criar Link',
        },
      };

      cy.get('main').contains(
        'h2',
        verbiage[locale]?.h2 || 'Share secrets without the digital footprint.'
      );

      cy.get('main')
        .find('textarea')
        .should(
          'have.attr',
          'placeholder',
          verbiage[locale]?.placeholder ||
            'Passwords, credentials, API Keys or anything...'
        );

      cy.get('main').contains(
        'button',
        verbiage[locale]?.actionButton || 'Create Link'
      );
    });

    it('should fill out form', () => {

    });
  });
});
