var React = require('react');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

var ActualStockHistory = React.createClass({
        getInitialState: function () {
            return ({stockData: [], chartStockData: []});
        },
        handleMessage: function (event) {
            var tmp = JSON.parse(event.data);
            var tmpStock = this.state.stockData;
            var exists = false;
            var index = 0;
            for (var i = 0; i < tmpStock.length; i++) {
                if (tmpStock[i].Name === tmp.Name) {
                    index = i;
                    exists = true;
                    break;
                }
            }
            if (exists) {
                tmpStock[i] = tmp;
            } else {
                tmpStock.push(tmp);
            }
            this.setState({stockData: tmpStock});
        },
        componentDidMount: function () {
            var ws = new WebSocket("ws://karnicki.pl/api/WSChat");
            ws.onmessage = this.handleMessage;
        },
        render: function () {
            var stocks = this.state.stockData.map(function (elem) {
                var delta = elem.Price - elem.OldPrice;
                if (delta > 0) {
                    return (<Button bsSize="large" bsStyle='success'>
                        {elem.Name}<br/>{parseFloat(elem.Price).toFixed(2)}&nbsp;<Glyphicon glyph="arrow-up"></Glyphicon>
                    </Button>);
                } else if (delta < 0) {
                    return (<Button bsSize="large" bsStyle='danger'>
                        {elem.Name}<br/>{parseFloat(elem.Price).toFixed(2)}&nbsp;<Glyphicon glyph="arrow-down"></Glyphicon>
                    </Button>);
                } else {
                    return (<Button bsSize="large" bsStyle="primary">
                        {elem.Name}<br/>{parseFloat(elem.Price).toFixed(2)}
                    </Button>);
                }
            });
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