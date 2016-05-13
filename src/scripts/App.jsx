var React = require('react');
var ReactDOM = require('react-dom');
var NavbarMenu = require('./components/NavbarMenu');
var StatusPanel = require('./components/StatusPanel');
var ClockPanel = require('./components/ClockPanel');
var MainBody = require('./components/MainBody');

var App = React.createClass({
        handleViews: function (key) {
            if (this.state.view != key) this.setState({view: key});
        },
        getInitialState: function () {
            return {view: 1};
        },
        /*componentDidMount: function () {
         alert("Please look at:\n https://github.com/Notechus/react-gui\n\n" +
         "It contains newer version of UI, which may help\n in better understanding " +
         "some things I did here.");
         },*/
        render: function () {
            return (<div>
                <NavbarMenu handleViews={this.handleViews}/>
                <MainBody view={this.state.view}/>
                <ClockPanel/>
                <StatusPanel/>
            </div>);
        }
    })
    ;

window.onload = () => {
    ReactDOM.render(<App/>, document.getElementById('content'));
}