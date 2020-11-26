

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],    
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      async context =>{

        for(let i=0;i<context.result.data.length;i++)
        {
          let { _id } = context.result.data[i];
          let orders = await context.app.service('order').find({
            query : {
              customer : _id.toString()
            }
          });
          context.result.data[i].orders = orders.data
        }
        return context
      }
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
