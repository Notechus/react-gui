var React = require('react');
var PortfolioStore = require('../stores/PortfolioStore');
var BootstrapTable = require('react-bootstrap-table').BootstrapTable;
var TableHeaderColumn = require('react-bootstrap-table').TableHeaderColumn;

function getTOptionsFromStore() {
    return PortfolioStore.getAllOption();
}

var OptionTradeTable = React.createClass({
    getInitialState: function () {
        return {options: getTOptionsFromStore()};
    },
    onTradeChange: function () {
        this.setState({options: getTOptionsFromStore()});
    },
    componentDidMount: function () {
        PortfolioStore.addChangeListener(this.onTradeChange);
    },
    componentWillUnmount: function () {
        PortfolioStore.removeChangeListener(this.onTradeChange);
    },
    render: function () {
        var y = window.innerHeight * 0.4;
        return (
            <BootstrapTable data={this.state.options} striped={true} hover={true} condensed={true}
                            height={y.toString()}>
                <TableHeaderColumn dataField="counter" dataSort={true} width="70">#</TableHeaderColumn>
                <TableHeaderColumn dataField="id" isKey={true} dataSort={true}>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="underlying" dataSort={true}>Underlying</TableHeaderColumn>
                <TableHeaderColumn dataField="quantity" dataSort={true}>Quantity</TableHeaderColumn>
            </BootstrapTable>
        );
    }
});

module.exports = OptionTradeTable;