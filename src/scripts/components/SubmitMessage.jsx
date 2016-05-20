var React = require('react');
var DetailsStore = require('../stores/DetailsStore');
var AppDispatcher = require('../dispatcher/AppDispatcher');


var SubmitMessage = React.createClass({
    getInitialState: function () {
        return this.props.onInit;
    },
    onSubmitChange: function () {
        this.setState(getSubmitStateFromStore());
    },
    changeSubmitForEmpty: function () {
        AppDispatcher.dispatch({
            actionType: 'SUBMIT_UPDATE',
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

module.exports = SubmitMessage;