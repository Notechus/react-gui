var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var moment = require('moment');
var util = require('util');

var MarketDataStore = assign({}, EventEmitter.prototype, {
    marketData: {},
    chartMarketData: {},
    maxChartItems: 49,
    chartMinValue: 1000,
    chartMaxValue: 0,
    emitChange: function () {
        this.emit('change');
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    getAll: function () {
        return this.marketData;
    },
    getAllUnderlyings: function () {
        var underlyings = [];
        Object.keys(this.marketData).forEach(function (key) {
            underlyings.push(key);
        });
        return underlyings;
    },
    getChartData: function () {
        return this.chartMarketData;
    },
    getMin: function () {
        return this.chartMinValue;
    },
    getMax: function () {
        return this.chartMaxValue;
    },
    add: function (item) {
        var id = item.Name;
        this.marketData[id] = {
            timestamp: item.TimestampUtc,
            name: item.Name,
            price: item.Price,
            oldPrice: item.OldPrice
        };
        //var time = moment(item.TimestampUtc).format('h:mm:ss a');
        var time = new Date(item.TimestampUtc).getTime();
        if (typeof this.chartMarketData[id] === "undefined" || this.chartMarketData[id] === null) {
            this.chartMarketData[id] = {
                label: id,
                values: [{x: time, y: parseFloat(item.Price)}]
            };
            var y = parseFloat(item.Price);
            if (y > this.chartMaxValue) this.chartMaxValue = y;
            else if (y < this.chartMinValue) this.chartMinValue = y;
        } else {
            var x = this.chartMarketData[id];
            x.label = id;
            var y = parseFloat(item.Price);
            if (y > this.chartMaxValue) this.chartMaxValue = y;
            else if (y < this.chartMinValue) this.chartMinValue = y;
            if (x.values.length < this.maxChartItems) {
                x.values.push({x: time, y: parseFloat(item.Price)});
            } else {
                x.values.shift();
                x.values.push({x: time, y: parseFloat(item.Price)});
            }
        }
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case 'MARKET_NEW_CHANGE':
            MarketDataStore.add(action.data);
            MarketDataStore.emitChange();
            break;
    }
});

module.exports = MarketDataStore;