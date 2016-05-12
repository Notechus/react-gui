var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionConstants');
var assign = require('object-assign');

/*
 * (#, Underlying, Quantity) dla stock
 * (#, ID, Underlying, Direction, Maturity, Price) dla opcji
 * (#, ID, Underlying, Quantity) również dla opcji( chcemy widzieć tylko quantity)
 * (#, ID, Underlying, Notional) chcemy tylko zsumowany notional
 */
var PortfolioStore = assign({}, EventEmitter.prototype, {
    portfolio: {},
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
        return this.portfolio;
    },
    add: function (item) {
        var id = item.Name;
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.PORTFOLIO_NEW_ITEM:
            PortfolioStore.emitChange();
            break;
        default:
    }
});

module.exports = PortfolioStore;