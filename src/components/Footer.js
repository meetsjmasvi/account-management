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
      <div fixed="bottom" className="footer w-100" >
        <p className="text-right pr-4">Copyright 2019, {this.state.appName}</p>
      </div>
    );
  }

}

export default Footer;