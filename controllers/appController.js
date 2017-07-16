'use strict';

var FeesController = require('./feesController.js');
var OrdersController = require('./ordersController.js');

var path = require('path');
var fs = require('fs');
var _ = require('lodash');

var indent = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

class AppController {
    
    constructor() {
    }

    partOne() {
        var orders = OrdersController.getOrders();

        var results = [];

        _.forEach(this.getPrices(orders), function(order) {
            results.push('Order ID: ' + order.order_number);
            
            _.forEach(order.items, function(item) {
                results.push(indent + 'Order item ' + item.type + ': $' + item.price);
            });

            results.push(indent + 'Order total: $' + order.total);
        });

        return results.join('\r\n');
    }

    getPrices(orders) {
        var results = [];

        _.forEach(orders, function(order) {

            var result = {};
            results.push(result);

            result.order_number = order.order_number;
            var total = 0;
            result.items = []

            _.forEach(order.order_items, function(orderItem) {
            
                var price = FeesController.getPrice(orderItem);
                total += price;
                
                result.items.push({
                    type : orderItem.type,
                    price : price
                });
            });

            result.total = total;
            
        });

        return results;
    }

    partTwo() {
        var orders = OrdersController.getOrders();

        var results = [];

        _.forEach(this.getDistributions(orders), function(distr) {
            results.push('Order ID: ' + distr.order_number);

            for(var property in distr.distribution) {
                if(distr.distribution.hasOwnProperty(property)) {
                    results.push(indent + 'Fund - ' + property + ': $' + distr.distribution[property]);
                }
            }
        });

        return results.join('\r\n');
    }

    getDistributions(orders) {
        var results = [];

        _.forEach(orders, function(order) {

            var result = {};
            results.push(result);
            
            result.order_number = order.order_number;
            result.distribution = {};

            _.forEach(order.order_items, function(orderItem) {
                var itemDists = FeesController.getDistribution(orderItem);

                for (var property in itemDists) {
                    if (itemDists.hasOwnProperty(property)) {
                        
                        if(result.distribution[property] == null)
                            result.distribution[property] = itemDists[property];
                        else
                            result.distribution[property] += itemDists[property];
                    }
                }

            });
        });

        return results;
    }
}

module.exports = new AppController();