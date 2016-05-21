var React = require('react');
var PortfolioStore = require('../stores/PortfolioStore');
var BootstrapTable = require('react-bootstrap-table').BootstrapTable;
var TableHeaderColumn = require('react-bootstrap-table').TableHeaderColumn;
var AppDispatcher = require('../dispatcher/AppDispatcher');

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
    onRowClick: function (row) {
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: row.underlying, show: true},
            id: 'UNDERLYING',
            context: 'TRADE_STOCK_TABLE'
        });
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: row.quantity, show: true},
            id: 'QUANTITY',
            context: 'TRADE_STOCK_TABLE'
        });
    },
    render: function () {
        var y = window.innerHeight * 0.4;
        return (
            <BootstrapTable data={this.state.options} striped={true} hover={true} condensed={true}
                            height={y.toString()} options={{onRowClick: this.onRowClick}}>
                <TableHeaderColumn dataField="counter" isKey={true} dataSort={true} width="70">#</TableHeaderColumn>
                <TableHeaderColumn dataField="underlying" dataSort={true}>Underlying</TableHeaderColumn>
                <TableHeaderColumn dataField="quantity" dataSort={true}>Quantity</TableHeaderColumn>
            </BootstrapTable>
        );
    }
});

module.exports = StockTradeTable;