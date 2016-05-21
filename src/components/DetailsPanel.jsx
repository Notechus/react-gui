var React = require('react');
var Label = require('react-bootstrap').Label;
var DetailsStore = require('../stores/DetailsStore');

function getDetailsFromStore() {
    return {details: DetailsStore.getAllDetails()};
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
        var details = this.state.details.map(function (item) {
            return (<p><strong>{item.id + ': '}</strong>{item.details}</p>)
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