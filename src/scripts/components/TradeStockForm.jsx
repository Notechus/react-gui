var React = require('react');
var Form = require('react-bootstrap').Form;
var FormControl = require('react-bootstrap').FormControl;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;
var Alert = require('react-bootstrap').Alert;
var DetailsStore = require('../stores/DetailsStore');
var MarketStore = require('../stores/MarketDataStore');
var AppDispatcher = require('../dispatcher/AppDispatcher');

function getUnderlyingsFromStore() {
    return MarketStore.getAllUnderlyings();
}

function getSubmitStateFromStore() {
    return DetailsStore.getStockSubmitState();
}

var SubmitMessage = React.createClass({
    getInitialState: function () {
        return getSubmitStateFromStore();
    },
    onStockSubmitChange: function () {
        this.setState(getSubmitStateFromStore());
    },
    changeSubmitForEmpty: function () {
        AppDispatcher.dispatch({
            actionType: 'STOCK_SUBMIT_UPDATE',
            data: {
                submit: 'empty',
                msg: 'you should not see this'
            }
        });
    },
    componentDidMount: function () {
        DetailsStore.addChangeListener(this.onStockSubmitChange);
    },
    componentWillUnmount: function () {
        DetailsStore.removeChangeListener(this.onStockSubmitChange);
        AppDispatcher.dispatch({
            actionType: 'DETAIL_RESET'
        });
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

var TradeStockForm = React.createClass({
    getInitialState: function () {
        return {
            url: 'http://karnicki.pl/api/trade',
            underlyings: getUnderlyingsFromStore(),
            quantity: 0
        };
    },
    validateQuantity: function () {
        var x = parseInt(this.state.quantity);
        if (!Number.isInteger(x)) return 'error';
        else return 'success';
    },
    validateSubmit: function () {
        if (this.validateQuantity() === 'error') return false;
        else return true;
    },
    handleUnderlying: function (e) {
        this.setState({underlying: e.target.value});
        var show = true;
        if (e.target.value === '') {
            show = false;
        }
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: e.target.value, show: show},
            id: 'UNDERLYING',
            context: 'TRADE_STOCK'
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
            context: 'TRADE_STOCK'
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
            context: 'TRADE_STOCK'
        });
    },
    handleSubmit: function () {
        var tmp = {
            Underlying: this.state.underlying,
            Quantity: this.state.quantity,
            TradeType: 'Stock',
            UserName: 'SebastianPaulus'
        };
        var res = this.validateSubmit();
        if (res) {
            AppDispatcher.dispatch({
                actionType: 'STOCK_SUBMIT_UPDATE',
                data: {
                    submit: 'success',
                    msg: 'You have executed stock trade successfully.'
                }
            });
            AppDispatcher.dispatch({
                actionType: 'DETAIL_RESET'
            });
            AppDispatcher.dispatch({
                actionType: 'PORTFOLIO_POST_NEW_STOCK_TRADE',
                data: {
                    item: tmp,
                    url: this.state.url
                }
            });
            AppDispatcher.dispatch({
                actionType: 'PORTFOLIO_GET_EXISTING_STOCK',
                data: {
                    url: this.state.url, options: "trader=SebastianPaulus&TradeType=Stock"
                }
            });
        }
    },
    render: function () {
        var options = this.state.underlyings.map(function (item) {
            return (<option value={item}>{item}</option>);
        });
        return (
            <Form horizontal className="tradeOptionForm">
                <FormGroup>
                    <FormControl.Static>{''}</FormControl.Static>
                </FormGroup>
                <FormGroup controlId="formUnderlying" bsSize="small">
                    <Col componentClass={ControlLabel} sm={3}>
                        Underlying
                    </Col>
                    <Col sm={5}>
                        <FormControl componentClass="select" onChange={this.handleUnderlying}>
                            <option value="">select</option>
                            {options}
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
                <FormGroup controlID="formType" bsSize="small">
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

module.exports = TradeStockForm;