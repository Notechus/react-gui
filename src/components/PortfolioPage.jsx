var React = require('react');
var CreatedOptionTable = require('./CreatedOptionTable');
var OptionTradeTable = require('./OptionTradeTable');
var StockTradeTable = require('./StockTradeTable');
var Tabs = require('react-bootstrap').Tabs;
var Tab = require('react-bootstrap').Tab;
var AppDispatcher = require('../dispatcher/AppDispatcher');

var PortfolioPage = React.createClass({
    getInitialState: function () {
        return {key: 1};
    },
    componentDidMount: function () {
        AppDispatcher.dispatch({
            actionType: 'PORTFOLIO_GET_CREATED_TRADES',
            data: {
                url: "http://karnicki.pl/api/option", options: "trader=SebastianPaulus"
            }
        });
        AppDispatcher.dispatch({
            actionType: 'PORTFOLIO_GET_EXISTING_OPTIONS',
            data: {
                url: "http://karnicki.pl/api/trade", options: "trader=SebastianPaulus&TradeType=EuropeanOption"
            }
        });
        AppDispatcher.dispatch({
            actionType: 'PORTFOLIO_GET_EXISTING_STOCK',
            data: {
                url: "http://karnicki.pl/api/trade", options: "trader=SebastianPaulus&TradeType=Stock"
            }
        });
    },
    handleSelect(key){
        this.setState({key: key});
    },
    render: function () {
        return (
            <div id="portfolio">
                <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="portfolioTabs">
                    <Tab eventKey={1} title="Created Options"><CreatedOptionTable/></Tab>
                    <Tab eventKey={2} title="Option Trades"><OptionTradeTable/></Tab>
                    <Tab eventKey={3} title="Stock Trades"><StockTradeTable/></Tab>
                </Tabs>
            </div>
        );
    }
});

module.exports = PortfolioPage;