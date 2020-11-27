

module.exports = {
  before: {
    all: [],
    find: [async context =>{

      let result = await context.app.service('order').Model.aggregate([
        {
          $group : {
            _id : { day: { $dayOfMonth: "$createdAt" }},
            totalPrice: { $sum: { $multiply: [ "$price", "$quantity" ] } },
            ordersCount: { $sum: 1 }
                }
            
        }
      ])
      let response = [];
      for(let i=0;i<result.length;i++)
      {
        let obj = {
          day : result[i]._id.day,
          totalPrice : result[i].totalPrice,
          ordersCount : result[i].ordersCount
        }

        response.push(obj);
      }
      context.result = response;
      return context;
    }],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
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
