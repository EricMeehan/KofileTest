'use strict';

var path = require('path');
var fs = require('fs');
var _ = require('lodash');

class FeesController {

    constructor() {
        this.fees = JSON.parse(fs.readFileSync(path.resolve( __dirname + '/../public/json/fees.json'), 'utf8'));
    }

    getFees() {
        return this.fees;
    }

    getPrice(orderItem) {
        var feeType = _.find(this.fees, {order_item_type : orderItem.type});

        var subTotal = 0;

        var flatFee = _.find(feeType.fees, {type: 'flat'});

        subTotal += parseFloat(flatFee.amount);

        var pageFee = _.find(feeType.fees, {type: 'per-page'});

        if(pageFee != null && orderItem.pages > 1)
            subTotal += parseFloat(pageFee.amount) * (orderItem.pages - 1);

        return subTotal;
    }

    getDistribution(orderItem) {
        var feeType = _.find(this.fees, {order_item_type : orderItem.type});

        var itemPrice = this.getPrice(orderItem);
        var itemSubTotal = 0;

        var dists = {};

        _.forEach(feeType.distributions, function(dist) {
            dists[dist.name] = parseFloat(dist.amount);
            
            itemSubTotal += parseFloat(dist.amount);
        });

        if(itemSubTotal < itemPrice)
            dists.Other = itemPrice - itemSubTotal;

        return dists;
    }
}


module.exports = new FeesController();