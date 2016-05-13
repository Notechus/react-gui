var React = require('react');
var Thumbnail = require('react-bootstrap').Thumbnail;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;

var Avatar = React.createClass({
    render: function () {
        return (
            <div className="right-menu">
                <div className="avatar">
                    <Thumbnail href="#" alt="50x50" src="/static/avatar.png"/>
                </div>
                <div className="logout-button">
                    <Button><Glyphicon glyph="off"></Glyphicon></Button>
                </div>
            </div>);
    }
});


module.exports = Avatar;