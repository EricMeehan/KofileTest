'use strict';

var path = require('path');
var fs = require('fs');
var _ = require('lodash');

class OrdersController {

    constructor() {
        this.orders = JSON.parse(fs.readFileSync(path.resolve( __dirname + '/../public/json/orders.json'), 'utf8'));
    }

    getOrders() {
        return this.orders;
    }
}

module.exports = new OrdersController();