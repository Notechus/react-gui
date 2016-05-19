var React = require('react');
var Form = require('react-bootstrap').Form;
var FormControl = require('react-bootstrap').FormControl;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;
var PortfolioStore = require('../stores/PortfolioStore');

function getUnderlyingFromStore(id) {
    return PortfolioStore.getUnderlying(id);
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
    handleID: function (e) {
        this.setState({id: e.target.value});
        var x = getUnderlyingFromStore(e.target.value);
        if (typeof x == "undefined") {
            this.setState({underlying: ''});
        } else {
            this.setState({underlying: x});
        }
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
                <FormGroup>
                    <FormControl.Static>{''}</FormControl.Static>
                </FormGroup>
                <FormGroup controlId="formID" bsSize="small">
                    <Col componentClass={ControlLabel} sm={3}>
                        Option ID
                    </Col>
                    <Col sm={5}>
                        <FormControl type="text" onChange={this.handleID}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formUnderlying" bsSize="small">
                    <Col componentClass={ControlLabel} sm={3}>
                        Underlying
                    </Col>
                    <Col sm={5}>
                        <FormControl.Static
                            onChange={this.handleUnderlying}>{this.state.underlying}
                        </FormControl.Static>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formQuantity" bsSize="small">
                    <Col componentClass={ControlLabel} sm={3}>
                        Quantity
                    </Col>
                    <Col sm={5}>
                        <FormControl type="text" onChange={this.handleQuantity}/>
                    </Col>
                </FormGroup>
                <Col smOffset={9} sm={2}>
                    <Button type="button" onClick={this.handleSubmit}>
                        Execute
                    </Button>
                </Col>
            </Form>
        );
    }
});

module.exports = TradeOptionForm;