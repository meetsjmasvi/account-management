import React, { Component } from 'react';
import Container from "react-bootstrap/Container";

class Footer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      appName: "Blockone Bank"
    };
  };

  render() {
    return (
      <Container fluid fixed="bottom" className="footer" >
        <p className="text-right">Copyright 2019, {this.state.appName}</p>
      </Container>
    );
  }

}

export default Footer;