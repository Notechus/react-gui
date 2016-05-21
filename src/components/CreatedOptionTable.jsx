var React = require('react');
var PortfolioStore = require('../stores/PortfolioStore');
var BootstrapTable = require('react-bootstrap-table').BootstrapTable;
var TableHeaderColumn = require('react-bootstrap-table').TableHeaderColumn;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var moment = require('moment');
var util = require('util');

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
    onRowClick: function (row) {
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: row.id, show: true},
            id: 'ID',
            context: 'CREATE_OPTION_TABLE'
        });
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: row.underlying, show: true},
            id: 'UNDERLYING',
            context: 'CREATE_OPTION_TABLE'
        });
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: row.direction, show: true},
            id: 'DIRECTION',
            context: 'CREATE_OPTION_TABLE'
        });
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: moment(row.rawTime).format("MM/DD/YYYY h:mm a"), show: true},
            id: 'MATURITY',
            context: 'CREATE_OPTION_TABLE'
        });
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: row.price, show: true},
            id: 'STRIKE',
            context: 'CREATE_OPTION_TABLE'
        });
    },
    render: function () {
        var y = window.innerHeight * 0.4;
        return (
            <div className="createdOptionTable">
                <BootstrapTable data={this.state.options} striped={true} hover={true} condensed={true}
                                height={y.toString()} options={{onRowClick: this.onRowClick}}>
                    <TableHeaderColumn dataField="counter" dataSort={true} width="70">#</TableHeaderColumn>
                    <TableHeaderColumn dataField="id" isKey={true} dataSort={true}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="underlying" dataSort={true}>Underlying</TableHeaderColumn>
                    <TableHeaderColumn dataField="direction" dataSort={true} width="120">Direction</TableHeaderColumn>
                    <TableHeaderColumn dataField="maturity" dataSort={true}>Maturity</TableHeaderColumn>
                    <TableHeaderColumn dataField="price" dataSort={true} width="120">Price</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
});

module.exports = CreatedOptionTable;