import React, { Component } from 'react';
import { Navbar, Nav } from "react-bootstrap";

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      appName: "Blockone Bank"
    };
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img alt="" src="/logo.svg" width="30" height="30" className="d-inline-block align-top"
          />{this.state.appName}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
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