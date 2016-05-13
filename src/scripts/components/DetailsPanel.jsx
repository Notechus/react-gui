var React = require('react');
var Label = require('react-bootstrap').Label;
var DetailsStore = require('../stores/DetailsStore');

function getDetailsFromStore() {
    return {details: DetailsStore.getAll()};
}

var DetailsPanel = React.createClass({
    getInitialState: function () {
        return getDetailsFromStore();
    },
    onDetailChange: function () {
        this.setState(getDetailsFromStore());
    },
    componentDidMount: function () {
        DetailsStore.addChangeListener(this.onDetailChange);
    },
    componentWillUnmount: function () {
        DetailsStore.removeChangeListener(this.onDetailChange);
    },
    render: function () {
        var details = [];
        var self = this;
        Object.keys(self.state.details).forEach(function (key) {
            details.push(<p><strong>{key}:{' '}</strong>{self.state.details[key]}</p>);
        });
        return (
            <div className="detailsPanel">
                <Label>Details</Label>
                {details}
            </div>
        );
    }
});

module.exports = DetailsPanel;