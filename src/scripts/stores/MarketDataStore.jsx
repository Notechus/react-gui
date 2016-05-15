var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var moment = require('moment');
var util = require('util');

var MarketDataStore = assign({}, EventEmitter.prototype, {
    marketData: {},
    chartMarketData: {},
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
    getChartData2: function () {
        var chartData = [];
        var self = this;
        Object.keys(this.chartMarketData).forEach(function (key) {
            chartData.push(self.chartMarketData[key].values);
        });
        console.log(util.inspect(chartData, {showHidden: false, depth: null}));
        return chartData;
    },
    add: function (item) {
        var id = item.Name;
        //console.log('id ' + id);
        this.marketData[id] = {
            timestamp: item.TimestampUtc,
            name: item.Name,
            price: item.Price,
            oldPrice: item.OldPrice
        };
        var time = moment(item.TimestampUtc).format('h:mm:ss a');
        if (typeof this.chartMarketData[id] === "undefined" || this.chartMarketData[id] === null) {
            this.chartMarketData[id] = {
                label: id,
                values: [{x: time, y: item.Price}]
            };
        } else {
            this.chartMarketData[id].label = id;
            this.chartMarketData[id].values.push({x: time, y: item.Price});
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