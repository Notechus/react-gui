var React = require('react');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var MarketStore = require('../stores/MarketDataStore');

function getStateFromStore() {
    return {
        data: MarketStore.getAll()
    }
}

var ActualStockHistory = React.createClass({
        getInitialState: function () {
            return getStateFromStore();
        },
        onMarketChange: function () {
            this.setState(getStateFromStore());
        },
        componentDidMount: function () {
            MarketStore.addChangeListener(this.onMarketChange);
        },
        componentWillUnmount: function () {
            MarketStore.removeChangeListener(this.onMarketChange);
        },
        render: function () {
            var stocks = [];
            for (var i in this.state.data) {
                var item = this.state.data[i];
                var delta = item.price - item.oldPrice;
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