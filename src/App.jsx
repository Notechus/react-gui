var React = require('react');
var ReactDOM = require('react-dom');
var NavbarMenu = require('./components/NavbarMenu');
var StatusPanel = require('./components/StatusPanel');
var ClockPanel = require('./components/ClockPanel');
var MainBody = require('./components/MainBody');
var AppDispatcher = require('./dispatcher/AppDispatcher');
var WebSocket = require('./components/WebSocket');
var PortfolioStore = require('./stores/PortfolioStore');

var App = React.createClass({
    handleViews: function (key) {
        if (this.state.view != key) this.setState({view: key});
    },
    getInitialState: function () {
        return {view: 1};
    },
    handleMessage: function (event) {
        var tmp = JSON.parse(event.data);
        AppDispatcher.dispatch({
            actionType: 'MARKET_NEW_CHANGE',
            data: tmp
        });
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
        WebSocket.init("karnicki.pl/api/WSChat");
        WebSocket.addMessageHandler(this.handleMessage);
    },
    render: function () {
        return (
            <div>
                <NavbarMenu handleViews={this.handleViews}/>
                <MainBody view={this.state.view}/>
                <ClockPanel/>
                <StatusPanel/>
            </div>);
    }
});

window.onload = () => {
    ReactDOM.render(<App/>, document.getElementById('content'));
}