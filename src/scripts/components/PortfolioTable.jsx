var React = require('react');
var Table = require('react-bootstrap').Table;

var PortfolioTable = React.createClass({
    render: function () {
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
                <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                </tbody>
            </Table>
        );
    }
});

module.exports = PortfolioTable;