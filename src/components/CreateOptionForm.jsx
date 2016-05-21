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
var Alert = require('react-bootstrap').Alert;
var MarketStore = require('../stores/MarketDataStore');
var DetailsStore = require('../stores/DetailsStore');
var AppDispatcher = require('../dispatcher/AppDispatcher');

function getUnderlyingsFromStore() {
    return MarketStore.getAllUnderlyings();
}

function getSubmitStateFromStore() {
    return DetailsStore.getCreateSubmitState();
}

var SubmitMessage = React.createClass({
    getInitialState: function () {
        return getSubmitStateFromStore();
    },
    onSubmitChange: function () {
        this.setState(getSubmitStateFromStore());
    },
    changeSubmitForEmpty: function () {
        AppDispatcher.dispatch({
            actionType: 'CREATE_SUBMIT_UPDATE',
            data: {
                submit: 'empty',
                msg: 'you should not see this'
            }
        });
    },
    componentDidMount: function () {
        DetailsStore.addChangeListener(this.onSubmitChange);
    },
    componentWillUnmount: function () {
        DetailsStore.removeChangeListener(this.onSubmitChange);
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

var CreateOptionForm = React.createClass({
    getInitialState: function () {
        return {
            url: 'http://karnicki.pl/api/option',
            underlying: '',
            notional: 0,
            maturity: new Date(),
            direction: '',
            optStrike: 0,
            underlyings: getUnderlyingsFromStore()
        };
    },
    onMarketDataChange: function () {
        this.setState({underlyings: getUnderlyingsFromStore()});
    },
    validateNotional: function () {
        const x = parseInt(this.state.notional);
        if (!Number.isInteger(x)) return 'error';
        else return 'success';
    },
    validateMaturity: function () {
        var mat = this.state.maturity;
        if (moment().isAfter(mat)) return 'error';
        else return 'success';
    },
    validateStrike: function () {
        var x = this.state.optStrike;
        if (isNaN(x)) return 'error';
        else return 'success';
    },
    validateSubmit: function () {
        if (this.validateNotional() === 'error') {
            AppDispatcher.dispatch({
                actionType: 'CREATE_SUBMIT_UPDATE',
                data: {
                    submit: 'error',
                    msg: 'Notional should be a number.'
                }
            });
            return false;
        }
        if (this.validateMaturity() === 'error') {
            AppDispatcher.dispatch({
                actionType: 'CREATE_SUBMIT_UPDATE',
                data: {
                    submit: 'error',
                    msg: 'Maturity must be higher than actual date.'
                }
            });
            return false;
        }
        if (this.validateStrike() === 'error') {
            AppDispatcher.dispatch({
                actionType: 'CREATE_SUBMIT_UPDATE',
                data: {
                    submit: 'error',
                    msg: 'Strike should be a number.'
                }
            });
            return false;
        }
        return true;
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
            context: 'CREATE_OPTION'
        });
    },
    handleNotional: function (e) {
        this.setState({notional: e.target.value});
        var show = true;
        if (e.target.value === '') {
            show = false;
        }
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: e.target.value, show: show},
            id: 'NOTIONAL',
            context: 'CREATE_OPTION'
        });
    },
    handleMaturity: function (e) {
        var tmp = moment(e._d).toISOString();
        this.setState({maturity: tmp});
        var show = true;
        if (tmp === '') {
            show = false;
        }
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: moment(e._d).format("MM/DD/YY h:mm a"), show: show},
            id: 'MATURITY',
            context: 'CREATE_OPTION'
        });
    },
    handleDirection: function (e) {
        this.setState({direction: e.target.value});
        var show = true;
        if (e.target.value === '') {
            show = false;
        }
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: e.target.value, show: show},
            id: 'DIRECTION',
            context: 'CREATE_OPTION'
        });
    },
    handleStrike: function (e) {
        this.setState({optStrike: e.target.value});
        var show = true;
        if (e.target.value === '') {
            show = false;
        }
        AppDispatcher.dispatch({
            actionType: 'DETAIL_UPDATE',
            data: {details: e.target.value, show: show},
            id: 'STRIKE',
            context: 'CREATE_OPTION'
        });
    },
    handleSubmit: function () {
        var tmp = {
            Underlying: this.state.underlying,
            Notional: this.state.notional,
            Maturity: this.state.maturity,
            CallPutStr: this.state.direction,
            Strike: this.state.optStrike,
            UserName: 'SebastianPaulus'
        };
        var res = this.validateSubmit();
        if (res) {
            AppDispatcher.dispatch({
                actionType: 'CREATE_SUBMIT_UPDATE',
                data: {
                    submit: 'success',
                    msg: 'You have created option successfully.'
                }
            });
            AppDispatcher.dispatch({
                actionType: 'DETAIL_RESET'
            });
            AppDispatcher.dispatch({
                actionType: 'PORTFOLIO_POST_NEW_CREATED_OPTION',
                data: {
                    item: tmp,
                    url: this.state.url
                }
            });
            AppDispatcher.dispatch({
                actionType: 'PORTFOLIO_GET_CREATED_TRADES',
                data: {
                    url: this.state.url, options: "trader=SebastianPaulus"
                }
            });
        }
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
                <FormGroup bsSize="small">
                    <FormControl.Static>{' '}</FormControl.Static>
                </FormGroup>
                <FormGroup controlId="formUnderlying" bsSize="small">
                    <Col componentClass={ControlLabel} sm={2}> Underlying </Col>
                    <Col sm={3}>
                        <FormControl componentClass="select" onChange={this.handleUnderlying}>
                            <option value="">select</option>
                            {options}
                        </FormControl>
                    </Col>
                    <Col componentClass={ControlLabel} sm={2}> Notional </Col>
                    <Col sm={4}>
                        <FormControl type="text" onChange={this.handleNotional}/>
                    </Col>
                </FormGroup>
                <FormGroup controlID="formDirection" bsSize="small">
                    <Col componentClass={ControlLabel} sm={2}> Direction </Col>
                    <Col sm={3}>
                        <FormControl componentClass="select" placeholder="select"
                                     onChange={this.handleDirection}>
                            <option value="">select</option>
                            <option value="PUT">PUT</option>
                            <option value="CALL">CALL</option>
                        </FormControl>
                    </Col>
                    <Col componentClass={ControlLabel} sm={2}> Strike </Col>
                    <Col sm={4}><FormControl type="text" onChange={this.handleStrike}/></Col>
                </FormGroup>
                <FormGroup controlId="formMaturity" bsSize="small">
                    <Col componentClass={ControlLabel} sm={2}> Maturity </Col>
                    <Col sm={5}><Datetime onChange={this.handleMaturity}/></Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={6}>
                        <SubmitMessage/>
                    </Col>
                    <Col smPush={4} sm={2}>
                        <Button type="button" onClick={this.handleSubmit}>
                            <Glyphicon glyph="plus"></Glyphicon>
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
});

module.exports = CreateOptionForm;