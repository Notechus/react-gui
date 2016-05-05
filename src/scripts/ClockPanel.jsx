var React = require('react');

var renderTime = function (offset) {
    var currentTime = new Date();
    if (offset != 0) {
        currentTime.setHours(currentTime.getUTCHours() + offset);
    }
    var diem = " AM";
    var h = currentTime.getHours();
    var m = currentTime.getMinutes();
    var s = currentTime.getSeconds();


    if (h == 0) {
        h = 12
    } else if (h > 12) {
        h = h - 12;
        diem = " PM";
    }

    if (h < 10) {
        h = "0" + h;
    }

    if (m < 10) {
        m = "0" + m;
    }

    if (s < 10) {
        s = "0" + s;
    }
    var output = {
        hours: h,
        minutes: m,
        seconds: s,
        diem
    };
    return output;
};

const Clock = React.createClass({
    getInitialState() {
        return {time: renderTime()};
    },
    componentDidMount() {
        setInterval(this.tick, 1000);
    },
    tick() {
        var output = renderTime(this.props.timeOffset);
        this.setState({hours: output.hours, minutes: output.minutes, seconds: output.seconds, diem: output.diem});
    },
    render() {
        return (
            <div className="clock">
                <p>
                    <span className="clockCity"><strong>{this.props.city}</strong><br/></span>
                    { this.state.hours }:{ this.state.minutes }:{ this.state.seconds }
                    <span className='clockDiem'>{ this.state.diem }</span>
                </p>
            </div>
        );
    }
});

// ATM London has +1
var ClockPanel = React.createClass({
    render: function () {
        return (
            <div id="clockBar">
                <div className="clockDefaults" id="yourClock"><Clock timeOffset={0} city="Your clock"/></div>
                <div className="clockDefaults" id="nyClock"><Clock timeOffset={-4} city="New York"/></div>
                <div className="clockDefaults" id="tokClock"><Clock timeOffset={9} city="Tokyo"/></div>
                <div className="clockDefaults" id="lonClock"><Clock timeOffset={1} city="London"/></div>
            </div>
        );
    }
});
module.exports = ClockPanel;