import Chance from 'chance';

const chance = new Chance();

['pt-BR', chance.locale({ region: true })].forEach((locale) => {
  describe(`Index page (${locale})`, () => {
    beforeEach(() => {
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

    it('mounts important callouts and interactive elements labels', () => {
      const callouts = {
        'pt-BR': {
          h2: 'Compartilhe segredos sem a pegada digital.',
        },
      };

      cy.get('main').contains(
        'h2',
        callouts[locale]?.h2 || 'Share secrets without the digital footprint.'
      );
    });
  });
});
