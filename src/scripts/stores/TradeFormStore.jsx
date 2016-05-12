var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionConstants');
var assign = require('object-assign');

var TradeFormStore = assign({}, EventEmitter.prototype, {
    forms: {}, // id: 1 - create_opt, 2 - trade_opt, 3 - trade_stock, 4 - details
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
        return this.forms;
    },
    add: function (item) {
        var id = item.Id;
        
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.TRADE_NEW_ITEM:
            TradeFormStore.emitChange();
            break;
        default:
    }
});

module.exports = TradeFormStore;