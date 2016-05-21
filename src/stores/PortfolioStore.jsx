var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var moment = require('moment');
var util = require('util');

var PortfolioStore = assign({}, EventEmitter.prototype, {
    createdOptions: {},
    tradeOptions: {},
    tradeStock: [],
    emitChange: function () {
        this.emit('change');
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    getAllCreatedOptions: function () {
        var self = this;
        var tmp = [];
        var counter = 1;
        Object.keys(this.createdOptions).forEach(function (key) {
            var x = self.createdOptions[key];
            x.counter = counter++;
            tmp.push(x);
        });
        return tmp;
    },
    getAllStock: function () {
        return this.tradeStock;
    },
    getAllOption: function () {
        var self = this;
        var tmp = [];
        Object.keys(this.tradeOptions).forEach(function (key) {
            var x = self.tradeOptions[key];
            //x.underlying = self.getUnderlying(x.id);
            tmp.push(x);
        });
        return tmp;
    },
    getUnderlying: function (id) {
        return this.createdOptions[id].underlying;
    },
    addCreatedOption: function (item) {
        //(#, ID, Underlying, Direction, Maturity, Price)
        var tmp = {
            id: item.id,
            underlying: item.underlying,
            direction: item.direction,
            maturity: item.maturity,
            price: item.price
        };
        this.createdOptions[item.id] = tmp;
    },
    addTradeOption: function (item) {
        //(#, ID, Underlying, Quantity)
        var id = item.id;
        var tmp = {
            id: id,
            underlying: item.underlying,
            quantity: item.quantity
        };
        this.tradeOptions[id] = tmp;
    },
    addTradeStock: function (item) {
        //(#, Underlying, Quantity)
        var tmp = {
            underlying: item.underlying,
            quantity: item.quantity
        };
        this.tradeStock.push(tmp);
    },
    loadCreatedOptions: function (url, options) {
        var self = this;
        $.getJSON(url, options, function (result) {
            var res = jQuery.parseJSON(result);
            res.forEach(function (item) {
                var id = item.Id;
                self.createdOptions[id] = {
                    id: id,
                    underlying: item.Underlying,
                    direction: item.CallPutStr,
                    maturity: moment(item.Maturity).format('MMMM Do YYYY, h:mm:ss a'),
                    price: item.Strike,
                    rawTime: item.Maturity
                };
            });
        });
    },
    loadOptionTrade: function (url, options) {
        var self = this;
        var counter = 1;
        $.getJSON(url, options, function (result) {
            var res = jQuery.parseJSON(result);
            res.forEach(function (item) {
                var id = item.Id;
                self.tradeOptions[id] = {
                    counter: counter,
                    id: id,
                    quantity: item.Quantity
                };
                counter++;
            });
        });
    },
    loadStockTrade: function (url, options) {
        var self = this;
        var counter = 1;
        var trades = [];
        $.getJSON(url, options, function (result) {
            var res = jQuery.parseJSON(result);
            res.forEach(function (item) {
                var id = item.Id;
                trades.push({
                    counter: counter,
                    underlying: item.Underlying,
                    quantity: item.Quantity
                });
                counter++;
            });
        });
        this.tradeStock = trades;
    },
    postCreatedOption: function (url, item) {
        $.post(url, item).done(function (data) {
        });
    },
    postOptionTrade: function (url, item) {
        $.post(url, item, function (data) {
        });
    },
    postStockTrade: function (url, item) {
        $.post(url, item).done(function (data) {
        });
    },
    validateId: function (id) {
        Object.keys(this.createdOptions).forEach(function (key) {
            if (key === id) return true;
        });
        return false;
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case 'PORTFOLIO_NEW_OPTION':
            PortfolioStore.addCreatedOption(action.data);
            PortfolioStore.emitChange();
            break;
        case 'PORTFOLIO_NEW_OPTION_TRADE':
            PortfolioStore.addTradeOption(action.data);
            PortfolioStore.emitChange();
            break;
        case 'PORTFOLIO_NEW_STOCK_TRADE':
            PortfolioStore.addTradeStock(action.data);
            PortfolioStore.emitChange();
            break;
        case 'PORTFOLIO_GET_CREATED_TRADES':
            PortfolioStore.loadCreatedOptions(action.data.url, action.data.options);
            PortfolioStore.emitChange();
            break;
        case 'PORTFOLIO_GET_EXISTING_OPTIONS':
            PortfolioStore.loadOptionTrade(action.data.url, action.data.options);
            PortfolioStore.emitChange();
            break;
        case 'PORTFOLIO_GET_EXISTING_STOCK':
            PortfolioStore.loadStockTrade(action.data.url, action.data.options);
            PortfolioStore.emitChange();
            break;
        case 'PORTFOLIO_POST_NEW_CREATED_OPTION':
            PortfolioStore.postCreatedOption(action.data.url, action.data.item);
            PortfolioStore.emitChange();
            break;
        case 'PORTFOLIO_POST_NEW_OPTION_TRADE':
            PortfolioStore.postOptionTrade(action.data.url, action.data.item);
            PortfolioStore.emitChange();
            break;
        case 'PORTFOLIO_POST_NEW_STOCK_TRADE':
            PortfolioStore.postStockTrade(action.data.url, action.data.item);
            PortfolioStore.emitChange();
            break;
    }
});

module.exports = PortfolioStore;