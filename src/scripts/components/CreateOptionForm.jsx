var React = require('react');
var Form = require('react-bootstrap').Form;
var FormControl = require('react-bootstrap').FormControl;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Datetime = require('react-datetime');
var moment = require('moment');
var Col = require('react-bootstrap').Col;
var MarketStore = require('../stores/MarketDataStore');
var TradeStore = require('../stores/TradeFormStore');
var ActionTypes = require('../constants/ActionConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

function getUnderlyingsFromStore() {
    return MarketStore.getAllUnderlyings();
}

var CreateOptionForm = React.createClass({
    getInitialState: function () {
        return {
            underlying: '',
            notional: '',
            maturity: '',
            direction: '',
            optStrike: '',
            submited: false,
            underlyings: getUnderlyingsFromStore()
        };
    },
    onChange: function () {
        this.setState(getUnderlyingsFromStore());
    },
    validateNotional: function () {
        var x = this.state.notional;
        if (x >= 1000000 || x <= -1000000) return 'error';
        if (!Number.isInteger(x)) return 'error';
    },
    validateMaturity: function () {
        var mat = this.state.maturity;
        if (moment().isAfter(mat)) return 'error';
    },
    validateStrike: function () {
        var x = this.state.optStrike;
        if (isNaN(x)) return 'error';
    },
    handleUnderlying: function (e) {
        this.setState({underlying: e.target.value});
    },
    handleNotional: function (e) {
        this.setState({notional: e.target.value});
    },
    handleMaturity: function (e) {
        this.setState({maturity: e});
    },
    handleDirection: function (e) {
        this.setState({direction: e.target.value});
    },
    handleStrike: function (e) {
        this.setState({optStrike: e.target.value}); // i parse - don't know how to validate from string yet
    },
    handleSubmit: function () {
        var tmp = {
            id: 1,
            underlying: this.state.underlying,
            notional: this.state.notional,
            maturity: this.state.maturity,
            direction: this.state.direction,
            optStrike: this.state.optStrike
        };
        AppDispatcher.dispatch({
            actionType: ActionTypes.TRADE_NEW_OPTION,
            data: tmp
        });
        this.setState({submitted: true});
    },
    componentDidMount: function () {
        //MarketStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function () {
        //MarketStore.removeChangeListener(this.onChange);
    },
    render: function () {
        var options = this.state.underlyings.map(function (item) {
            return (<option value="other">{item}</option>);
        });
        return (
            <Form horizontal className="createOptionForm">
                <FormGroup controlId="formUnderlying">
                    <Col componentClass={ControlLabel} sm={2}>
                        Underlying
                    </Col>
                    <Col sm={4}>
                        <FormControl componentClass="select" placeholder="select" onChange={this.handleUnderlying}>
                            {options}
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formNotional" validationState={this.validateNotional()}>
                    <Col componentClass={ControlLabel} sm={2}>
                        Notional
                    </Col>
                    <Col sm={4}>
                        <FormControl type="text" onChange={this.handleNotional}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formMaturity" validationState={this.validateMaturity()}>
                    <Col componentClass={ControlLabel} sm={2}>
                        Maturity
                    </Col>
                    <Col sm={4}>
                        <Datetime onChange={this.handleMaturity}/>
                    </Col>
                </FormGroup>
                <FormGroup controlID="formDirection">
                    <Col componentClass={ControlLabel} sm={2}>
                        Direction
                    </Col>
                    <Col sm={2}>
                        <FormControl componentClass="select" placeholder="select" onChange={this.handleDirection}>
                            <option value="select">PUT</option>
                            <option value="other">CALL</option>
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formStrike" validationState={this.validateStrike()}>
                    <Col componentClass={ControlLabel} sm={2}>
                        Strike
                    </Col>
                    <Col sm={4}>
                        <FormControl type="text" onChange={this.handleStrike}/>
                    </Col>
                </FormGroup>
                <Col sm={2}>
                    <Button type="submit" bsStyle="success" onClick={this.handleSubmit}>
                        <Glyphicon glyph="plus"></Glyphicon>
                    </Button>
                </Col>
            </Form>
        );
    }
});

module.exports = CreateOptionForm;