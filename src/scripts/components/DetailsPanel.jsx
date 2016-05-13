var React = require('react');
var Label = require('react-bootstrap').Label;

var DetailsPanel = React.createClass({
    render: function () {
        return (
            <div className="detailsPanel">
                <Label>Details</Label>
                <p>&nbsp;</p>
                <p><strong>ID:</strong> 56487cc0d89fffa1384a855c</p>
                <p><strong>Underlying:</strong> GOOG</p>
                <p><strong>Direction:</strong> PUT</p>
                <p><strong>Maturity:</strong> 01/06/2016</p>
                <p><strong>Price:</strong> 104.98 USD</p>
            </div>);
    }
});

module.exports = DetailsPanel;