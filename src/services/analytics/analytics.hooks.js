const moment = require('moment');

module.exports = {
  before: {
    all: [],
    find: [async context =>{

      let result = await context.app.service('order').Model.aggregate([
        { $match : {
          createdAt : { $gte : new Date(context.params.query.startDate), $lte : new Date(context.params.query.endDate)}
        }},
        {
          $group : {
            _id : { day: { $dayOfMonth: "$createdAt" }, month : { $month : "$createdAt" }, year : { $year : "$createdAt"}},
            totalPrice: { $sum: { $multiply: [ "$price", "$quantity" ] } },
            createdDate : { $first : "$createdAt"},
            ordersCount: { $sum: 1 }
            },
        },
        {
        $sort : {
          createdDate : 1
        }
      }
      ])
      let response = [];

      let startDate = new Date(context.params.query.startDate);
      let endDate = new Date(context.params.query.endDate);
      let datesMap = new Map();
      for(let i=0;i<result.length;i++)
      {
        let obj = {
          day : new Date(result[i].createdDate).getDate(),
          totalPrice : result[i].totalPrice,
          ordersCount : result[i].ordersCount,
          createdDate : result[i].createdDate
        }
        datesMap.set(moment(result[i].createdDate, true).format('DD/MM/YYYY'),obj)
      }
      let dummyResult = [];
      while(startDate <= endDate)
      {
        if(datesMap.get(moment(startDate, true).format('DD/MM/YYYY')))
        { 
          dummyResult.push(datesMap.get(moment(startDate, true).format('DD/MM/YYYY')))
        }
        else
        {
          let obj = {
            day : startDate.getDate(),
            totalPrice : 0,
            ordersCount : 0,
            createdDate : new Date(startDate)
          }
          dummyResult.push(obj);

        }
       
        startDate.setDate(startDate.getDate()+1)
      }
      context.result = dummyResult;
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
