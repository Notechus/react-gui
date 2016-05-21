var React = require('react');
var PortfolioStore = require('../stores/PortfolioStore');
var BootstrapTable = require('react-bootstrap-table').BootstrapTable;
var TableHeaderColumn = require('react-bootstrap-table').TableHeaderColumn;
var AppDispatcher = require('../dispatcher/AppDispatcher');

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
    onRowClick: function (row) {
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: row.id, show: true},
            id: 'ID',
            context: 'TRADE_OPTION_TABLE'
        });
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: row.underlying, show: true},
            id: 'UNDERLYING',
            context: 'TRADE_OPTION_TABLE'
        });
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: row.quantity, show: true},
            id: 'QUANTITY',
            context: 'TRADE_OPTION_TABLE'
        });
    },
    render: function () {
        var y = window.innerHeight * 0.4;
        return (
            <BootstrapTable data={this.state.options} striped={true} hover={true} condensed={true}
                            height={y.toString()} options={{onRowClick: this.onRowClick}}>
                <TableHeaderColumn dataField="counter" dataSort={true} width="70">#</TableHeaderColumn>
                <TableHeaderColumn dataField="id" isKey={true} dataSort={true}>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="underlying" dataSort={true}>Underlying</TableHeaderColumn>
                <TableHeaderColumn dataField="quantity" dataSort={true}>Quantity</TableHeaderColumn>
            </BootstrapTable>
        );
    }
});

module.exports = OptionTradeTable;