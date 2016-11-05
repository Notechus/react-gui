var React = require('react');
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;

var Avatar = React.createClass({
    render: function () {
        return (
            <div className="logout-button">
                <Button><Glyphicon glyph="off"></Glyphicon></Button>
            </div>
        );
    }
});


module.exports = Avatar;