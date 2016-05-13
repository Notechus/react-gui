var React = require('react');
var Form = require('react-bootstrap').Form;
var FormControl = require('react-bootstrap').FormControl;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Popover = require('react-bootstrap').Popover;
var Datetime = require('react-datetime');
var moment = require('moment');
var Col = require('react-bootstrap').Col;
var MarketStore = require('../stores/MarketDataStore');
var AppDispatcher = require('../dispatcher/AppDispatcher');

function getUnderlyingsFromStore() {
    return MarketStore.getAllUnderlyings();
}
/*
 var CustomPopover = React.createClass({
 render: function () {
 if (this.props.submited) {
 return (
 <div id="popover">
 <Popover placement="right" title={this.props.title}>
 You've created option successfully.
 </Popover>
 </div>);
 } else {
 return null;
 }
 }
 });
 */
var CreateOptionForm = React.createClass({
    getInitialState: function () {
        return {
            underlying: '',
            notional: 0,
            maturity: new Date(),
            direction: '',
            optStrike: 0,
            submited: false,
            underlyings: getUnderlyingsFromStore()
        };
    },
    onMarketDataChange: function () {
        this.setState(getUnderlyingsFromStore());
    },
    validateNotional: function () {
        const x = this.state.notional;
        console.log('not ' + x);
        if (x >= 1000000 || x <= -1000000) return 'error';
        if (!Number.isInteger(x)) return 'error';
    },
    validateMaturity: function () {
        var mat = this.state.maturity;
        console.log('mat ' + mat);
        if (moment().isAfter(mat)) return 'error';
    },
    validateStrike: function () {
        var x = this.state.optStrike;
        console.log('str ' + x);
        if (isNaN(x)) return 'error';
    },
    handleUnderlying: function (e) {
        /*AppDispatcher.dispatch({
         actionType: 'DETAIL_UPDATE',
         data: {Underlying: e.target.value}
         });*/
        this.setState({underlying: e.target.value});
    },
    handleNotional: function (e) {
        /*AppDispatcher.dispatch({
         actionType: 'DETAIL_UPDATE',
         data: {Notional: e.target.value}
         });*/
        this.setState({notional: e.target.value});
    },
    handleMaturity: function (e) {
        this.setState({maturity: e});
        /*AppDispatcher.dispatch({
         actionType: 'DETAIL_UPDATE',
         data: {Maturity: e}
         });*/
    },
    handleDirection: function (e) {
        /*AppDispatcher.dispatch({
         actionType: 'DETAIL_UPDATE',
         data: {Direction: e.target.value}
         });*/
        this.setState({direction: e.target.value});
    },
    handleStrike: function (e) {
        /*AppDispatcher.dispatch({
         actionType: 'DETAIL_UPDATE',
         data: {Strike: e.target.value}
         });*/
        this.setState({optStrike: e.target.value});
    },
    handleSubmit: function () {
        var tmp = {
            underlying: this.state.underlying,
            maturity: this.state.maturity,
            direction: this.state.direction,
            price: this.state.optStrike
        };
        AppDispatcher.dispatch({
            actionType: 'PORTFOLIO_NEW_OPTION',
            data: tmp
        });
        this.setState({submited: true});
    },
    componentDidMount: function () {
        MarketStore.addChangeListener(this.onMarketDataChange);
    },
    componentWillUnmount: function () {
        MarketStore.removeChangeListener(this.onMarketDataChange);
    },
    render: function () {
        var options = this.state.underlyings.map(function (item) {
            return (<option value={item}>{item}</option>);
        });
        return (
            <Form horizontal className="createOptionForm">
                <FormGroup controlId="formUnderlying">
                    <Col componentClass={ControlLabel} sm={2}>
                        Underlying
                    </Col>
                    <Col sm={4}>
                        <FormControl componentClass="select" onChange={this.handleUnderlying}>
                            <option value="">select</option>
                            {options}
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formNotional">
                    <Col componentClass={ControlLabel} sm={2}>
                        Notional
                    </Col>
                    <Col sm={4}>
                        <FormControl type="text" onChange={this.handleNotional}/>
                        <FormControl.Feedback/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formMaturity">
                    <Col componentClass={ControlLabel} sm={2}>
                        Maturity
                    </Col>
                    <Col sm={4}>
                        <Datetime onChange={this.handleMaturity}/>
                        <FormControl.Feedback/>
                    </Col>
                </FormGroup>
                <FormGroup controlID="formDirection">
                    <Col componentClass={ControlLabel} sm={2}>
                        Direction
                    </Col>
                    <Col sm={2}>
                        <FormControl componentClass="select" placeholder="select" onChange={this.handleDirection}>
                            <option value="PUT">PUT</option>
                            <option value="CALL">CALL</option>
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formStrike">
                    <Col componentClass={ControlLabel} sm={2}>
                        Strike
                    </Col>
                    <Col sm={4}>
                        <FormControl type="text" onChange={this.handleStrike}/>
                        <FormControl.Feedback/>
                    </Col>
                </FormGroup>
                <Col sm={2}>
                    <Button type="button" bsStyle="success" onClick={this.handleSubmit}>
                        <Glyphicon glyph="plus"></Glyphicon>
                    </Button>
                </Col>
            </Form>
        );
    }
});

module.exports = CreateOptionForm;