var React = require('react');
var Label = require('react-bootstrap').Label;
var CreateOptionForm = require('./CreateOptionForm');
var TradeOptionForm = require('./TradeOptionForm');
var TradeStockForm = require('./TradeStockForm');
var Tabs = require('react-bootstrap').Tabs;
var Tab = require('react-bootstrap').Tab;

var TradeStore = React.createClass({
    getInitialState: function () {
        return {key: 1};
    },
    handleSelect(key){
        this.setState({key: key});
    },
    render: function () {
        return (
            <div className="tradeStoreView">
                <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="formTabs">
                    <Tab eventKey={1} title="Create Option"><Label>Create Option</Label> <CreateOptionForm/></Tab>
                    <Tab eventKey={2} title="Create Option Trade"><Label>Trade Option</Label> <TradeOptionForm/></Tab>
                    <Tab eventKey={3} title="Create Stock Trade"><Label>Trade Stock</Label> <TradeStockForm/></Tab>
                </Tabs>
            </div>
        );
    }
});

module.exports = TradeStore;