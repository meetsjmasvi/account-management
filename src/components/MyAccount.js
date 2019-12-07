import React, { Component } from 'react';
import Config from '../config/client';

// Bootstrap Dependencies
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

// Custom Components
import AccountSummary from "./AccountSummary";
import HistoryTable from "./HistoryTable"

class MyAccount extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "My Account",
      accountNo: [],
      selectedAccount: 0
    };

    this.onAccountChange = this.onAccountChange.bind(this);
  };

  componentDidMount() {
    fetch(`${Config.apiEndPoint}/accounts`)
      .then(res => res.json())
      .then(res => {
        let accountNumbers = res.map(item => item.accno);
        let currentAccount = accountNumbers.length > 0 ? accountNumbers[0] : '';
        this.setState({
          accountNo: accountNumbers,
          selectedAccount: currentAccount
        });
      });
  }

  getAccountNumber() {
    return this.state.accountNo.map((item, index) => {
      return <option key={index + 1} value={item}>{item}</option>
    });
  }

  // Events
  onAccountChange(evt) {
    this.setState({
      selectedAccount: evt.target.value
    });
  }

  render() {
    return (
      <div className="my-account">
        <h1 className="text-left">Transaction History</h1>
        <Jumbotron>
          <Form>
            <Form.Row>
              <Form.Group className="text-left" as={Col} sm={4} md={3} controlId="formGridState">
                <Form.Label>Account No.</Form.Label>
                <Form.Control as="select" onChange={this.onAccountChange}>
                  {this.getAccountNumber()}
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Form>
        </Jumbotron>
        <AccountSummary accountId={this.state.selectedAccount} />
        <div className="trans-history">
          <HistoryTable accountId={this.state.selectedAccount} />
        </div>
      </div>
    );
  }

}

export default MyAccount;