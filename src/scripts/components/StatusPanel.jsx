var React = require('react');
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var DetailsPanel = require('./DetailsPanel');

var CustomPanel = React.createClass({
    getInitialState: function () {
        return ({value: 0.0, previousValue: 0.0});
    },
    componentDidMount: function () {
        this.setState({value: this.props.initialValue});
    },
    render: function () {
        var delta = this.state.value - this.state.previousValue;
        if (delta > 0) {
            return (
                <Button bsSize="large" bsStyle='success'>
                    {this.props.name}<br/>{parseFloat(this.state.value).toFixed(2)}&nbsp;
                    <Glyphicon glyph="arrow-up"></Glyphicon>
                </Button>
            );
        } else if (delta < 0) {
            return (
                <Button bsSize="large" bsStyle='danger'>
                    {this.props.name}<br/>{parseFloat(this.state.value).toFixed(2)}&nbsp;
                    <Glyphicon glyph="arrow-down"></Glyphicon>
                </Button>
            );
        } else {
            return (
                <Button bsSize="large" bsStyle='primary'>
                    {this.props.name}<br/>{parseFloat(this.state.value).toFixed(2)}&nbsp;
                </Button>
            );
        }
    }
});

var StatusPanel = React.createClass({
    handleStatus: function () {

    },
    render: function () {
        return (
            <div className="container" id="statusBar">
                <div className="statusPanel pvPanel">
                    <CustomPanel name="PV" initialValue={1.5}/>
                </div>
                <div className="statusPanel deltaPanel">
                    < CustomPanel name="Delta" initialValue={-1.5}/>
                </div >
                <div>
                    <DetailsPanel/>
                </div>
            </div>
        );
    }
});

module.exports = StatusPanel;