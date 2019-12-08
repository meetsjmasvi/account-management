import React, { Component } from 'react';

// Bootstrap Dependencies
import { Jumbotron, Form, Col, Container } from "react-bootstrap";

// Custom Components
import AccountSummary from "./AccountSummary";
import TransactionHistory from "./TransactionHistory"

class MyAccount extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "My Account",
      accountNo: [],
      selectedAccountID: 0
    };

    this.onAccountChange = this.onAccountChange.bind(this);
  };

  componentDidMount() {
    let accountNumbers = this.props.accountService.accountNo;
    let currentAccount = accountNumbers.length > 0 ? accountNumbers[0] : '';

    this.setState({
      accountNo: accountNumbers,
      selectedAccountID: currentAccount
    });
  }

  getAccountNumber() {
    if (!this.state.accountNo.length) {
      return <option value="select">Select Account</option>;
    }

    return this.state.accountNo.map((item, index) => {
      return <option key={index + 1} value={item}>{item}</option>
    });
  }

  // Events
  onAccountChange(evt) {
    this.setState({
      selectedAccountID: evt.target.value
    });
  }

  render() {
    return (
      <Container fluid className="app-container">
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
          <AccountSummary accountId={this.state.selectedAccountID} accountService={this.props.accountService} />
          <div className="trans-history">
            <TransactionHistory accountId={this.state.selectedAccountID} accountService={this.props.accountService} />
          </div>
        </div>
      </Container>
    );
  }

}

export default MyAccount;