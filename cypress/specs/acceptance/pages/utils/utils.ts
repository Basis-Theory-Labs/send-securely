export const logAccesibilityViolations = (violations) => {
  cy.task('log', `${violations.length} accessibility violations detected`);

  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  );

  cy.task('table', violationData);
};
