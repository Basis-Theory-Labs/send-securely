/* eslint-disable no-console */
/* eslint-disable get-off-my-lawn/prefer-arrow-functions */
/**
 * @type {Cypress.PluginConfig}
 */
const plugins: Cypress.PluginConfig = (on) => {
  on('task', {
    log(message) {
      console.log(message);

      return undefined;
    },
    table(message) {
      console.table(message);

      return undefined;
    },
  });
};

export default plugins;

/* eslint-enable no-console */
/* eslint-enable get-off-my-lawn/prefer-arrow-functions */
