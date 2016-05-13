var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var DetailsStore = assign({}, EventEmitter.prototype, {
    details: {},
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
        return this.details;
    },
    update: function (detail) {
        this.details = detail;
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
    }
});

module.exports = DetailsStore;