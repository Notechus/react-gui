var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var PortfolioStore = assign({}, EventEmitter.prototype, {
    createdOptions: {},
    tradeOptions: {},
    tradeStock: [],
    s4: function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    },
    guid: function () {
        return (this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
        this.s4() + '-' + this.s4() + this.s4() + this.s4());
    },
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
        return this.createdOptions;
    },
    getAllStock: function () {
        return this.tradeStock;
    },
    getAllOption: function () {
        return this.tradeOptions;
    },
    getUnderlying: function (id) {
        console.log(id);
        console.log(this.createdOptions[id]);
        return this.createdOptions[id].underlying;
    },
    addCreatedOption: function (item) {
        //(#, ID, Underlying, Direction, Maturity, Price)
        var id = this.guid();
        var tmp = {
            id: id,
            underlying: item.underlying,
            direction: item.direction,
            maturity: item.maturity,
            price: item.price
        };
        this.createdOptions[id] = tmp;
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
        var xrs = new XMLHttpRequest();
        xrs.open('GET', url, true);
        xrs.withCredentials = true;
        xrs.onreadystatechange = function (data) {
            var resp = JSON.parse(xrs.responseText);
            //console.log('option: ' + data);
            console.log('option: ' + resp);
        };
        xrs.send();
    },
    loadOptionTrade: function (url) {
        xrs = new XMLHttpRequest();
        xrs.open('GET', url, true);
        xrs.onreadystatechange = function (data) {
            console.log('otrade: ' + data);
        }
        xrs.send();
    },
    loadStockTrade: function (url, options) {
        $.getJSON(url, function (data) {
            console.log('strade: ' + data);
        });
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
    }
});

module.exports = PortfolioStore;