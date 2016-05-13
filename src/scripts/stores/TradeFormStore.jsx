var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionConstants');
var assign = require('object-assign');

var TradeFormStore = assign({}, EventEmitter.prototype, {
        forms: {}, // id: 1 - create_opt, 2 - trade_opt, 3 - trade_stock, 4 - details
        emitChange: function () {
            this.emit('change');
        }
        ,
        addChangeListener: function (callback) {
            this.on('change', callback);
        }
        ,
        removeChangeListener: function (callback) {
            this.removeListener('change', callback);
        }
        ,
        getAll: function () {
            return this.forms;
        }
        ,
        getForm: function (id) {
            console.log(this.forms[id]);
            return this.forms[id];
        }
        ,
        add: function (item) {
            var id = item.id;
            this.forms[id] = {
                underlying: item.underlying,
                notional: item.notional,
                maturity: item.maturity,
                direction: item.direction,
                optStrike: item.optStrike
            };
        }
    })
    ;

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.TRADE_UNSUBMITED:
            TradeFormStore.add(action.data);
            TradeFormStore.emitChange();
            break;
        default:
    }
});

module.exports = TradeFormStore;