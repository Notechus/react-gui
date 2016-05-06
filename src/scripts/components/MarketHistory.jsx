var React = require('react');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');

var ActualStockHistory = React.createClass({
    getInitialState: function () {
        return ({stockData: [], tempStockData: []});
    },
    handleStockChange(){

    },
    componentDidMount: function () {
        var ws = new WebSocket("ws://karnicki.pl/api/WSChat");
        ws.onmessage = function (event) {
            console.log(event.data);
            state.tempStockData.push(event.data);
        };
    },
    render: function () {
        return (
            <ButtonToolbar>
                <Button bsSize="large" bsStyle={this.state.stockData.buttonStyle}>{this.state.stockData.Name}</Button>
                <Button bsSize="large" bsStyle="success">Success</Button>
                <Button bsSize="large" bsStyle="info">Info</Button>
                <Button bsSize="large" bsStyle="warning">Warning</Button>
                <Button bsSize="large" bsStyle="danger">Danger</Button>
            </ButtonToolbar>
        );
    }
});

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