var React = require('react');
var Label = require('react-bootstrap').Label;
var CreateOptionForm = require('./CreateOptionForm');
var TradeOptionForm = require('./TradeOptionForm');
var TradeStockForm = require('./TradeStockForm');

var TradeStore = React.createClass({
    render: function () {
        return (
            <div className="tradeStoreView">
                <div className="tradeStoreDefaults createOption">
                    <Label>Create Option</Label>
                    <CreateOptionForm/>
                </div>
                <div className="tradeStoreDefaults tradeOption">
                    <Label>Trade Option</Label>
                    <TradeOptionForm/>
                </div>
                <div className="tradeStoreDefaults tradeStock">
                    <Label>Trade Stock</Label>
                    <TradeStockForm/>
                </div>
            </div>
        );
    }
});

module.exports = TradeStore;