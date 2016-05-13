var React = require('react');
var Table = require('react-bootstrap').Table;
var PortfolioStore = require('../stores/PortfolioStore');

function getCOptionsFromStore() {
    return PortfolioStore.getAllCreatedOptions();
}

var CreatedOptionTable = React.createClass({
    getInitialState: function () {
        return {options: getCOptionsFromStore()};
    },
    onOptionsChange: function () {
        this.setState({options: getCOptionsFromStore()});
    },
    componentDidMount: function () {
        PortfolioStore.addChangeListener(this.onOptionsChange);
    },
    componentWillUnmount: function () {
        PortfolioStore.removeChangeListener(this.onOptionsChange);
    },
    render: function () {
        var options = [];
        var self = this;
        var counter = 1;
        for (var i in self.state.options) {
            var tmp = self.state.options[i];
            options.push(
                <tr>
                    <td>{counter++}</td>
                    <td>{tmp.id}</td>
                    <td>{tmp.underlying}</td>
                    <td>{tmp.direction}</td>
                    <td>{tmp.maturity.toString()}</td>
                    <td>{tmp.price}</td>
                </tr>
            );
        }
        return (<Table responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Underlying</th>
                    <th>Direction</th>
                    <th>Maturity</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {options}
                </tbody>
            </Table>
        );
    }
});

module.exports = CreatedOptionTable;