var React = require('react');
var PortfolioStore = require('../stores/PortfolioStore');
var BootstrapTable = require('react-bootstrap-table').BootstrapTable;
var TableHeaderColumn = require('react-bootstrap-table').TableHeaderColumn;

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
        var y = window.innerHeight * 0.4;
        return (
            <div className="createdOptionTable">
                <BootstrapTable data={this.state.options} striped={true} hover={true} condensed={true}
                                height={y.toString()}>
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