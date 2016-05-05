var React = require('react');
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');
var Navbar = require('react-bootstrap/lib/Navbar');
var Avatar = require('./Avatar');

const NavbarMenu = React.createClass({
    render: function () {
        return (<Navbar inverse fluid>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#" id="brand-name">Trade Application</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem eventKey={1} href="#">Portfolio</NavItem>
                <NavItem eventKey={2} href="#">Market Data</NavItem>
                <NavItem eventKey={3} href="#">Trade Store</NavItem>
            </Nav>
            <Nav pullRight>
                <Navbar.Text>You are logged as: <strong>Trader</strong> </Navbar.Text>
                <Avatar fluid/>
            </Nav>
        </Navbar>);
    }
});
module.exports = NavbarMenu;