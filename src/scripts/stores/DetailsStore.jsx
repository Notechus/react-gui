var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var DetailsStore = assign({}, EventEmitter.prototype, {
    details: [
        {id: '', show: false},
        {underlying: '', show: false},
        {direction: '', show: false},
        {maturity: '', show: false},
        {strike: '', show: false},
        {notional: '', show: false},
        {quantity: '', show: false},
        {type: '', show: false}
    ],
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
        return this.details;
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
    update: function (id, detail) {
        this.details[id] = detail;
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
    },
    add: function (detail) {

    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case 'DETAIL_UPDATE':
            DetailsStore.add(action.data);
            DetailsStore.emitChange();
            break;
        case 'DETAIL_ERASE':
            DetailsStore.update({});
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