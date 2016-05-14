var React = require('react');
var Form = require('react-bootstrap').Form;
var FormControl = require('react-bootstrap').FormControl;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;


var TradeStockForm = React.createClass({
    getInitialState: function () {
        return {
            underlying: '',
            quantity: 0,
            submited: false
        };
    }, handleUnderlying: function (e) {
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
                <FormGroup controlId="formUnderlying">
                    <Col componentClass={ControlLabel} sm={3}>
                        Underlying
                    </Col>
                    <Col sm={5}>
                        <FormControl type="text" onChange={this.handleUnderlying}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formQuantity">
                    <Col componentClass={ControlLabel} sm={3}>
                        Quantity
                    </Col>
                    <Col sm={5}>
                        <FormControl type="text" onChange={this.handleQuantity}/>
                    </Col>
                </FormGroup>
                <div id="stockSubmitBtn">
                    <Button type="button" onClick={this.handleSubmit}>
                        Execute
                    </Button>
                </div>
            </Form>
        );
    }
});

module.exports = TradeStockForm;