var React = require('react');
var Table = require('react-bootstrap').Table;
var PortfolioStore = require('../stores/PortfolioStore');

function getStockTradesFromStore() {
    return PortfolioStore.getAllStock();
}

var StockTradeTable = React.createClass({
    getInitialState: function () {
        return {stockTrades: getStockTradesFromStore()};
    },
    render: function () {
        return (<Table responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Underlying</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                </tbody>
            </Table>
        );
    }
});

module.exports = StockTradeTable;