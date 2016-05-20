var React = require('react');
var MarketDataStore = require('../stores/MarketDataStore');
var LineChart = require('react-d3').LineChart;
var d3 = require('d3');

function getChartDataFromStore() {
    return MarketDataStore.getChartData2();
}

var NewLineCHart = React.createClass({
    getInitialState: function () {
        return getChartDataFromStore;
    },
    componentDidMount: function () {
        MarketDataStore.addChangeListener(this.onChartDataChange);
    },
    componentWillUnmount: function () {
        MarketDataStore.removeChangeListener(this.onChartDataChange);
    },
    onChartDataChange: function () {
        this.setState(getChartDataFromStore());
    },
    render: function () {
        return (
            <LineChart
                title="Market Price History"
                data={this.state.data}
                xScale="time"
            />);
    }
});

module.exports = NewLineCHart;