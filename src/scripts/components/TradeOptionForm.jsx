var React = require('react');
var Form = require('react-bootstrap').Form;
var FormControl = require('react-bootstrap').FormControl;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;
var MarketStore = require('../stores/MarketDataStore');
var AppDispatcher = require('../dispatcher/AppDispatcher');

function getUnderlyingFromStore(id) {
    return MarketStore.getUnderlying(id);
}

var TradeOptionForm = React.createClass({
    getInitialState: function () {
        return {
            id: '',
            underlying: '',
            quantity: 0,
            submited: false
        };
    },
    onMarketDataChange: function () {
        this.setState(getUnderlyingFromStore(this.state.id));
    },
    handleID: function (e) {
        this.setState({id: e.target.value});
    },
    handleUnderlying: function (e) {
        this.setState({underlying: e.target.value});
    },
    handleQuantity: function (e) {
        this.setState({quantity: e.target.value});
    },
    handleSubmit: function () {

    },
    render: function () {
        return (
            <Form horizontal className="tradeOptionForm">
                <FormGroup controlId="formID">
                    <Col componentClass={ControlLabel} sm={2}>
                        Option ID
                    </Col>
                    <Col sm={4}>
                        <FormControl type="text" onChange={this.handleID}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formUnderlying">
                    <Col componentClass={ControlLabel} sm={2}>
                        Underlying
                    </Col>
                    <Col sm={4}>
                        <FormControl type="text" onChange={this.handleUnderlying}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formQuantity">
                    <Col componentClass={ControlLabel} sm={2}>
                        Quantity
                    </Col>
                    <Col sm={4}>
                        <FormControl type="text" onChange={this.handleQuantity}/>
                    </Col>
                </FormGroup>
                <Col sm={2}>
                    <Button type="button" onClick={this.handleSubmit}>
                        Execute
                    </Button>
                </Col>
            </Form>
        );
    }
});

module.exports = TradeOptionForm;