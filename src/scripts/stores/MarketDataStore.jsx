var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

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
    add: function (item) {
        var id = item.Name;
        this.marketData[id] = {
            timestamp: item.TimestampUtc,
            name: item.Name,
            price: item.Price,
            oldPrice: item.OldPrice
        };
        this.chartMarketData[item.TimestampUtc] = {
            timestamp: item.TimestampUtc,
            name: item.Name,
            price: item.Price,
            oldPrice: item.OldPrice
        };
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