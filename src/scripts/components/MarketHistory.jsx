var React = require('react');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
//var MarketStore = require('../stores/MarketStore');
var MarketStore = require('../stores/MarketDataStore');
var AppDispatcher = require('../dispatcher/AppDispatcher');

function getStateFromStore() {
    return {
        data: MarketStore.getAll()
    }
}

var ActualStockHistory = React.createClass({
        getInitialState: function () {
            return getStateFromStore();
        },
        onChange: function () {
            this.setState(getStateFromStore());
        },
        handleMessage: function (event) {
            var tmp = JSON.parse(event.data);
            AppDispatcher.dispatch({
                actionType: 'new-market-change',
                data: tmp
            });
        },
        componentDidMount: function () {
            var ws = new WebSocket("ws://karnicki.pl/api/WSChat");
            this.state.webSock = ws;
            ws.onmessage = this.handleMessage;
            MarketStore.addChangeListener(this.onChange);
        },
        componentWillUnmount: function () {
            this.state.webSock.close();
            MarketStore.removeChangeListener(this.onChange);
        },
        render: function () {
            var stocks = [];
            for (var i in this.state.data) { // myślę, że to trochę hakerka, ale nie byłem w stanie nic wymyśleć
                var item = this.state.data[i];
                var delta = item.price - item.oldPrice;
                console.log("id " + item.name + " delta " + delta);
                if (delta > 0) {
                    stocks.push(
                        <Button bsSize="large" bsStyle='success'>
                            {item.name}<br/>{parseFloat(item.price).toFixed(2)}&nbsp;
                            <Glyphicon glyph="arrow-up"></Glyphicon>
                        </Button>
                    );
                } else if (delta < 0) {
                    stocks.push(
                        <Button bsSize="large" bsStyle='danger'>
                            {item.name}<br/>{parseFloat(item.price).toFixed(2)}&nbsp;
                            <Glyphicon glyph="arrow-down"></Glyphicon>
                        </Button>
                    );
                } else {
                    stocks.push(
                        <Button bsSize="large" bsStyle='primary'>
                            {item.name}<br/>{parseFloat(item.price).toFixed(2)}&nbsp;
                        </Button>
                    );
                }
            }
            return (
                <ButtonToolbar>
                    {stocks}
                </ButtonToolbar>
            );
        }
    })
    ;

var MarketHistory = React.createClass({
    render: function () {
        return (
            <div id="actualStockPrice">
                <ActualStockHistory/>
            </div>
        );
    }
});

module.exports = MarketHistory;