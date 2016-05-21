var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var util = require('util');

var DetailsStore = assign({}, EventEmitter.prototype, {
    // form details
    id: {details: '', show: false},
    underlying: {details: '', show: false},
    direction: {details: '', show: false},
    maturity: {details: '', show: false},
    strike: {details: '', show: false},
    notional: {details: '', show: false},
    quantity: {details: '', show: false},
    type: {details: '', show: false},
    context: '',
    //form states
    createSubmitState: '',
    createSubmitMsg: '',
    optionSubmitState: '',
    optionSubmitMsg: '',
    stockSubmitState: '',
    stockSubmitMsg: '',
    emitChange: function () {
        this.emit('change');
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    getAllDetails: function () {
        var details = [];
        if (this.id.show) details.push({id: 'ID', details: this.id.details});
        if (this.underlying.show) details.push({id: 'Underlying', details: this.underlying.details});
        if (this.direction.show) details.push({id: 'Direction', details: this.direction.details});
        if (this.maturity.show) details.push({id: 'Maturity', details: this.maturity.details});
        if (this.strike.show) details.push({id: 'Strike', details: this.strike.details});
        if (this.notional.show) details.push({id: 'Notional', details: this.notional.details});
        if (this.quantity.show) details.push({id: 'Quantity', details: this.quantity.details});
        if (this.type.show) details.push({id: 'Type', details: this.type.details});
        //console.log(util.inspect(details));
        return details;
    },
    getCreateSubmitState: function () {
        return {submit: this.createSubmitState, msg: this.createSubmitMsg};
    },
    getOptionSubmitState: function () {
        return {submit: this.optionSubmitState, msg: this.optionSubmitMsg};
    },
    getStockSubmitState: function () {
        return {submit: this.stockSubmitState, msg: this.stockSubmitMsg};
    },
    reset: function () {
        this.id.show = false;
        this.underlying.show = false;
        this.direction.show = false;
        this.maturity.show = false;
        this.strike.show = false;
        this.notional.show = false;
        this.quantity.show = false;
        this.type.show = false;
    },
    update: function (id, detail, context) {
        if (this.context != context) {
            this.reset();
            this.context = context;
        }
        switch (id) {
            case 'ID':
                this.id = detail;
                break;
            case 'UNDERLYING':
                this.underlying = detail;
                break;
            case 'DIRECTION':
                this.direction = detail;
                break;
            case 'MATURITY':
                this.maturity = detail;
                break;
            case 'STRIKE':
                this.strike = detail;
                break;
            case 'NOTIONAL':
                this.notional = detail;
                break;
            case 'QUANTITY':
                this.quantity = detail;
                break;
            case 'TYPE':
                this.type = detail;
                break;
        }
    },
    updateCreateSubmit: function (item) {
        this.createSubmitState = item.submit;
        this.createSubmitMsg = item.msg;
    },
    updateOptionSubmit: function (item) {
        this.optionSubmitState = item.submit;
        this.optionSubmitMsg = item.msg;
    },
    updateStockSubmit: function (item) {
        this.stockSubmitState = item.submit;
        this.stockSubmitMsg = item.msg;
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case 'DETAIL_UPDATE':
            DetailsStore.update(action.id, action.data, action.context);
            DetailsStore.emitChange();
            break;
        case 'DETAIL_RESET':
            DetailsStore.reset();
            DetailsStore.emitChange();
            break;
        case 'CREATE_SUBMIT_UPDATE':
            DetailsStore.updateCreateSubmit(action.data);
            DetailsStore.emitChange();
            break;
        case 'OPTION_SUBMIT_UPDATE':
            DetailsStore.updateOptionSubmit(action.data);
            DetailsStore.emitChange();
            break;
        case 'STOCK_SUBMIT_UPDATE':
            DetailsStore.updateStockSubmit(action.data);
            DetailsStore.emitChange();
            break;
    }
});

module.exports = DetailsStore;