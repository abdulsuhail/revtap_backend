const { Service } = require('feathers-mongoose');

exports.Customer = class Customer extends Service {
    constructor(options,app)
    {
        super(options);
    }


    async create(data, params) {
        return super.create(data, params);

    }
};
