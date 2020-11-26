const customer = require('./customer/customer.service.js');
const order = require('./order/order.service.js');
const analytics = require('./analytics/analytics.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(customer);
  app.configure(order);
  app.configure(analytics);
}
  