// Initializes the `analytics` service on path `/analytics`
const { Analytics } = require('./analytics.class');
const hooks = require('./analytics.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/analytics', new Analytics(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('analytics');

  service.hooks(hooks);
};
