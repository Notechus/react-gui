var React = require('react');
var Panel = require('react-bootstrap/lib/Panel');

var StatusPanel = React.createClass({
    render: function () {
        return (
            <div className="container" id="statusBar">
                <Panel id="statusPanel">
                    <p>PV</p>
                </Panel>
                <Panel id="statusPanel">
                    <p>Delta</p>
                </Panel>
            </div>
        );
    }
});

module.exports = StatusPanel;