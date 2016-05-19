var React = require('react');
var PortfolioStore = require('../stores/PortfolioStore');
var BootstrapTable = require('react-bootstrap-table').BootstrapTable;
var TableHeaderColumn = require('react-bootstrap-table').TableHeaderColumn;

function getStockTradesFromStore() {
    return PortfolioStore.getAllStock();
}

var StockTradeTable = React.createClass({
    getInitialState: function () {
        return {options: getStockTradesFromStore()};
    },
    onStockChange: function () {
        this.setState({options: getStockTradesFromStore()});
    },
    componentDidMount: function () {
        PortfolioStore.addChangeListener(this.onStockChange);
    },
    componentWillUnmount: function () {
        PortfolioStore.removeChangeListener(this.onStockChange);
    },
    render: function () {
        var y = window.innerHeight * 0.4;
        return (
            <BootstrapTable data={this.state.options} striped={true} hover={true} condensed={true}
                            height={y.toString()}>
                <TableHeaderColumn dataField="counter" isKey={true} dataSort={true} width="70">#</TableHeaderColumn>
                <TableHeaderColumn dataField="underlying" dataSort={true}>Underlying</TableHeaderColumn>
                <TableHeaderColumn dataField="quantity" dataSort={true}>Quantity</TableHeaderColumn>
            </BootstrapTable>
        );
    }
});

module.exports = StockTradeTable;