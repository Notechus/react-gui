var React = require('react');
var ReactDOM = require('react-dom');
var Col = require('react-bootstrap/lib/Col');
var NavbarMenu = require('./NavbarMenu');
var StatusPanel = require('./StatusPanel');
var ClockPanel = require('./ClockPanel');
var MainBody = require('./MainBody');

var App = React.createClass({
    render: function () {
        return (<div>
            <NavbarMenu/>
            <MainBody/>
            <ClockPanel/>
            <StatusPanel/>
        </div>);
    }
});

window.onload = () => {
    ReactDOM.render(<App/>, document.getElementById('content'));
}