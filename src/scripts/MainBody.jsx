var React = require('react');
var MarketTable = require('./MarketTable');
var PageHeader = require('react-bootstrap/lib/PageHeader');

var MainBody = React.createClass({
    render: function () {
        return (
            <div className="container" id="mainBody">
                <PageHeader> Portfolio</PageHeader>
                <MarketTable/>
            </div>
        );
    }
});

module.exports = MainBody;