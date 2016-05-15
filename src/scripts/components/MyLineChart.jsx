var React = require('react');
var MarketDataStore = require('../stores/MarketDataStore');
var util = require('util');
var LineChart = require('react-easy-chart').LineChart;

function getChartDataFromStore() {
    return {data: MarketDataStore.getChartData2()};
}

var MyLineChart = React.createClass({
    getInitialState: function () {
        return getChartDataFromStore();
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
        //if (this.state.data.length < 1) {
            var dat = [{x: 'No data available', y: 1}];
            return (<div className="marketPriceChart">
                    <LineChart
                        axes
                        axisLabels={{x: 'Time',y:'Price'}}
                        xType={'text'}
                        margin={{top: 0, right: 0, bottom: 100, left: 100}}
                        width={800}
                        height={600}
                        interpolate={'cardinal'}
                        data={dat}
                    />
                </div>
            );
        //}
        //return null;
        //console.log(util.inspect(this.state.data, {showHidden: false, depth: null}));
        /*return (
         <LineChart
         axes
         axisLabels={{x: 'Time',y:'Price'}}
         xType={'text'}
         margin={{top: 0, right: 0, bottom: 100, left: 100}}
         width={800}
         height={600}
         interpolate={'cardinal'}
         data={this.state.data}
         />
         );*/
    }
});

module.exports = MyLineChart;