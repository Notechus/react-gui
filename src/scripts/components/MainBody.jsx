var React = require('react');
var MarketTable = require('./MarketTable');
var PageHeader = require('react-bootstrap/lib/PageHeader');
var MarketHistory = require('./MarketHistory');
var TradeStore = require('./TradeStore');

var MainBody = React.createClass({
        render: function () {
            switch (this.props.view) {
                case 1:
                    return (
                        <div className="container" id="mainBody">
                            <PageHeader> Portfolio</PageHeader>
                            <MarketTable/>
                        </div>
                    );
                case 2:
                    return (
                        <div className="container" id="mainBody">
                            <PageHeader> Market Data</PageHeader>
                            <MarketHistory/>
                        </div>
                    );
                case 3:
                    return (
                        <div className="container" id="mainBody">
                            <PageHeader> Trade Store</PageHeader>
                            <TradeStore/>
                        </div>
                    );
            }

        }
    })
    ;

module.exports = MainBody;