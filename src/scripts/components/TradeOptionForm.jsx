var React = require('react');
var Form = require('react-bootstrap').Form;
var FormControl = require('react-bootstrap').FormControl;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;
var Alert = require('react-bootstrap').Alert;
var DetailsStore = require('../stores/DetailsStore');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var PortfolioStore = require('../stores/PortfolioStore');

function validateItemId(id) {
    return PortfolioStore.validateId(id);
}

function getSubmitStateFromStore() {
    return DetailsStore.getOptionSubmitState();
}

var SubmitMessage = React.createClass({
    getInitialState: function () {
        return getSubmitStateFromStore();
    },
    onOptionSubmitChange: function () {
        this.setState(getSubmitStateFromStore());
    },
    changeSubmitForEmpty: function () {
        AppDispatcher.dispatch({
            actionType: 'OPTION_SUBMIT_UPDATE',
            data: {
                submit: 'empty',
                msg: 'you should not see this'
            }
        });
    },
    componentDidMount: function () {
        DetailsStore.addChangeListener(this.onOptionSubmitChange);
    },
    componentWillUnmount: function () {
        DetailsStore.removeChangeListener(this.onOptionSubmitChange);
    },
    render: function () {
        if (this.state.submit === 'success') {
            return (
                <Alert bsStyle="success" onDismiss={this.changeSubmitForEmpty}>
                    <strong>{this.state.msg}</strong>
                </Alert>
            );
        }
        if (this.state.submit === 'error') {
            return (
                <Alert bsStyle="danger" onDismiss={this.changeSubmitForEmpty}>
                    <strong>{this.state.msg}</strong>
                </Alert>
            );
        }
        else {
            return null;
        }
    }
});

var TradeOptionForm = React.createClass({
    getInitialState: function () {
        return {
            url: 'http://karnicki.pl/api/trade',
            id: '',
            underlying: '',
            quantity: 0
        };
    },
    componentWillUnmount: function () {
        AppDispatcher.dispatch({
            actionType: 'DETAIL_RESET'
        });
    },
    validateId: function () {
        if (!validateItemId(this.state.id)) return 'error';
        else return 'success';
    },
    validateQuantity: function () {
        var x = parseInt(this.state.quantity);
        if (!Number.isInteger(x)) return 'error';
        else return 'success';
    },
    validateSubmit: function () {
        if (this.validateId() === 'error') {
            AppDispatcher.dispatch({
                actionType: 'OPTION_SUBMIT_UPDATE',
                data: {
                    submit: 'error',
                    msg: 'You have inserted wrong ID.'
                }
            });
            return false;
        }
        if (this.validateQuantity() === 'error') {
            AppDispatcher.dispatch({
                actionType: 'OPTION_SUBMIT_UPDATE',
                data: {
                    submit: 'error',
                    msg: 'Quantity should be positive number.'
                }
            });
            return false;
        }
        return true;
    },
    handleID: function (e) {
        this.setState({id: e.target.value});
        var show = true;
        if (e.target.value === '') {
            show = false;
        }
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: e.target.value, show: show},
            id: 'ID',
            context: 'TRADE_OPTION'
        });
    },
    handleType: function (e) {
        if (e.target.value === 'BUY') {
            this.setState({quantity: -this.state.quantity});
        } else {
            this.setState({quantity: -this.state.quantity});
        }
        var show = true;
        if (e.target.value === '') {
            show = false;
        }
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: this.state.quantity, show: show},
            id: 'QUANTITY',
            context: 'TRADE_OPTION'
        });
    },
    handleQuantity: function (e) {
        this.setState({quantity: e.target.value});
        var show = true;
        if (e.target.value === '') {
            show = false;
        }
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: e.target.value, show: show},
            id: 'QUANTITY',
            context: 'TRADE_OPTION'
        });
    },
    handleSubmit: function () {
        var tmp = {
            Underlying: this.state.underlying,
            OptionId: this.state.id,
            Quantity: this.state.quantity,
            TradeType: 'EuropeanOption',
            UserName: 'SebastianPaulus'
        };
        var res = this.validateSubmit();
        if (res) {
            AppDispatcher.dispatch({
                actionType: 'OPTION_SUBMIT_UPDATE',
                data: {
                    submit: 'success',
                    msg: 'You have executed option trade successfully.'
                }
            });
            AppDispatcher.dispatch({
                actionType: 'DETAIL_RESET'
            });
            AppDispatcher.dispatch({
                actionType: 'PORTFOLIO_POST_NEW_OPTION_TRADE',
                data: {
                    item: tmp,
                    url: this.state.url
                }
            });
            AppDispatcher.dispatch({
                actionType: 'PORTFOLIO_GET_EXISTING_OPTIONS',
                data: {
                    url: this.state.url, options: "trader=SebastianPaulus&TradeType=EuropeanOption"
                }
            });
        }
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
                        Type
                    </Col>
                    <Col sm={5}>
                        <FormControl componentClass="select" placeholder="select"
                                     onChange={this.handleType}>
                            <option value="">select</option>
                            <option value="BUY">BUY</option>
                            <option value="SELL">SELL</option>
                        </FormControl>
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
                <Col sm={6}>
                    <SubmitMessage/>
                </Col>
                <Col smPush={4} sm={2}>
                    <Button type="button" onClick={this.handleSubmit}>
                        Execute
                    </Button>
                </Col>
            </Form>
        );
    }
});

module.exports = TradeOptionForm;