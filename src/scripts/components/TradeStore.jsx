var React = require('react');
var Label = require('react-bootstrap/lib/Label');

//TODO: add forms
var TradeStore = React.createClass({
    render: function () {
        return (
            <div className="tradeStoreView">
                <div className="tradeStoreDefaults createOption">
                    <Label>Create Option</Label>
                </div>
                <div className="tradeStoreDefaults tradeOption">
                    <Label>Trade Option</Label>
                </div>
                <div className="tradeStoreDefaults tradeStock">
                    <Label>Trade Stock</Label>
                </div>
            </div>
        );
    }
});

module.exports = TradeStore;