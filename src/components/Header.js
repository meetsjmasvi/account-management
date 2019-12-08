import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from './logo';

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      appName: "Blockone Bank"
    };
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home" className="site-logo">
          <Logo className="d-inline-block align-top" />&nbsp;
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="mr-sm-2">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/summary">My Account</Nav.Link>
            <Nav.Link href="/transfer">Fund Transfer</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

export default Header;