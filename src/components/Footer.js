import React, { Component } from 'react';
import Container from "react-bootstrap/Container";

class Footer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      appName: "block.one"
    };
  };

  render() {
    return (
      <div fixed="bottom" className="footer w-100" >
        <p className="text-center">Copyright 2019, {this.state.appName}</p>
      </div>
    );
  }

}

export default Footer;