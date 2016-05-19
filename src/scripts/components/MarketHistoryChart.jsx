var React = require('react');
var LineChart = require('react-d3-components').LineChart;
var MarketDataStore = require('../stores/MarketDataStore');
var d3 = require('react-d3-components').d3;
var util = require('util');

function getChartDataFromStore() {
    return {data: MarketDataStore.getChartData()};
}

var MarketHistoryChart = React.createClass({
        getInitialState: function () {
            return getChartDataFromStore();
        },
        labelAccessor: function (stack) {
            return stack.label;
        },
        valuesAccessor: function (stack) {
            return stack.values;
        },
        xAccessor: function (element) {
            return element['x'];
        },
        yAccessor: function (element) {
            return element['y'];
        },
        tooltipLine: function (label, data) {
            return label + "Time: " + data.x + " Price: " + data.y;
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
            var x = (window.innerWidth * 0.5);
            var y = (window.innerHeight * 0.5);
            var colorScale = d3.scale.category20();
            if (Object.keys(this.state.data).length < 1) {
                var data = {label: 'No data available', values: [{x: 'No data available', y: 1}]};
                return (<div className="marketPriceChart">
                    <LineChart
                        data={data}
                        width={x}
                        height={y}
                        shapeColor={"red"}
                        margin={{top:50,bottom:50,left:50,right:50}}
                        xAxis={{innerTickSize: 6, label: 'Time'}}
                        yAxis={{label: 'Price'}}
                    />
                </div>);
            } else {
                var self = this;
                var chartData = [];
                Object.keys(this.state.data).forEach(function (key) {
                    chartData.push(self.state.data[key]);
                });
                return (
                    <div className="marketPriceChart">
                        <LineChart
                            width={x}
                            height={y}
                            data={chartData}
                            label={this.labelAccessor}
                            x={this.xAccessor}
                            y={this.yAccessor}
                            values={this.valuesAccessor}
                            shapeColor={"red"}
                            margin={{top:50,bottom:50,left:50,right:50}}
                            xAxis={{innerTickSize: 6, label: 'Time'}}
                            yAxis={{label: 'Price'}}
                            colorScale={colorScale}
                            tooltipHtml={this.tooltipLine}
                        />
                    </div>
                );
            }
        }
    })
    ;

module.exports = MarketHistoryChart;